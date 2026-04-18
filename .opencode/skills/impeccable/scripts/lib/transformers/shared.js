import path from 'path';
import { cleanDir, ensureDir, writeFile, generateYamlFrontmatter, replacePlaceholders, prefixSkillReferences } from '../utils.js';

/**
 * Shared transformer logic for all providers.
 *
 * @param {Object} config - Provider-specific configuration
 * @param {string} config.provider - Provider key for placeholders (e.g., 'claude-code')
 * @param {string} config.displayName - Display name for logging (e.g., 'Claude Code')
 * @param {string} config.configDir - Dot-directory name (e.g., '.claude')
 * @param {Function} config.buildFrontmatter - (skill, skillName) => frontmatter object
 * @param {Function} [config.transformBody] - Optional (body, skill) => transformed body
 * @param {Array} skills - All skills
 * @param {string} distDir - Distribution output directory
 * @param {Object} options - Optional settings (prefix, outputSuffix)
 */
export function transformProvider(config, skills, distDir, options = {}) {
  const { provider, displayName, configDir, buildFrontmatter, transformBody } = config;
  const { prefix = '', outputSuffix = '' } = options;
  const providerDir = path.join(distDir, `${provider}${outputSuffix}`);
  const skillsDir = path.join(providerDir, `${configDir}/skills`);

  cleanDir(providerDir);
  ensureDir(skillsDir);

  const allSkillNames = skills.map(s => s.name);
  const commandNames = skills.filter(s => s.userInvokable).map(s => `${prefix}${s.name}`);
  let refCount = 0;
  let scriptCount = 0;

  for (const skill of skills) {
    const skillName = `${prefix}${skill.name}`;
    const skillDir = path.join(skillsDir, skillName);

    const frontmatterObj = buildFrontmatter(skill, skillName);
    const frontmatter = generateYamlFrontmatter(frontmatterObj);

    let skillBody = replacePlaceholders(skill.body, provider, commandNames);

    // Replace {{scripts_path}} with provider-aware path to skill's scripts directory
    const scriptsPath = provider === 'claude-code'
      ? '${CLAUDE_PLUGIN_ROOT}/scripts'
      : `${configDir}/skills/${skillName}/scripts`;
    skillBody = skillBody.replace(/\{\{scripts_path\}\}/g, scriptsPath);

    if (prefix) skillBody = prefixSkillReferences(skillBody, prefix, allSkillNames);
    if (transformBody) skillBody = transformBody(skillBody, skill);

    const content = `${frontmatter}\n\n${skillBody}`;
    writeFile(path.join(skillDir, 'SKILL.md'), content);

    // Copy reference files if they exist
    if (skill.references && skill.references.length > 0) {
      const refDir = path.join(skillDir, 'reference');
      ensureDir(refDir);
      for (const ref of skill.references) {
        writeFile(
          path.join(refDir, `${ref.name}.md`),
          replacePlaceholders(ref.content, provider)
        );
        refCount++;
      }
    }

    // Copy script files if they exist
    if (skill.scripts && skill.scripts.length > 0) {
      const scriptsOutDir = path.join(skillDir, 'scripts');
      ensureDir(scriptsOutDir);
      for (const script of skill.scripts) {
        writeFile(path.join(scriptsOutDir, script.name), script.content);
        scriptCount++;
      }
    }
  }

  const userInvokableCount = skills.filter(s => s.userInvokable).length;
  const refInfo = refCount > 0 ? ` (${refCount} reference files)` : '';
  const scriptInfo = scriptCount > 0 ? ` (${scriptCount} script files)` : '';
  const prefixInfo = prefix ? ` [${prefix}prefixed]` : '';
  console.log(`✓ ${displayName}${prefixInfo}: ${skills.length} skills (${userInvokableCount} user-invokable)${refInfo}${scriptInfo}`);
}
