import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, readFileSync, existsSync, symlinkSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';

import {
  findProjectRoot,
  isImpeccableSkill,
  buildTargetNames,
  findSkillsDirs,
  removeDeprecatedSkills,
  cleanSkillsLock,
  cleanup,
} from '../source/skills/impeccable/scripts/cleanup-deprecated.mjs';

function makeTmpDir() {
  return mkdtempSync(join(tmpdir(), 'impeccable-cleanup-test-'));
}

function writeSkill(root, harness, name, content) {
  const dir = join(root, harness, 'skills', name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'SKILL.md'), content, 'utf-8');
  return dir;
}

describe('cleanup-deprecated', () => {
  let tmp;

  beforeEach(() => {
    tmp = makeTmpDir();
    // Mark as project root
    writeFileSync(join(tmp, 'package.json'), '{}', 'utf-8');
  });

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true });
  });

  describe('findProjectRoot', () => {
    it('finds directory with package.json', () => {
      const sub = join(tmp, 'a', 'b', 'c');
      mkdirSync(sub, { recursive: true });
      assert.equal(findProjectRoot(sub), tmp);
    });

    it('finds directory with skills-lock.json', () => {
      const root2 = makeTmpDir();
      writeFileSync(join(root2, 'skills-lock.json'), '{}', 'utf-8');
      assert.equal(findProjectRoot(root2), root2);
      rmSync(root2, { recursive: true, force: true });
    });
  });

  describe('isImpeccableSkill', () => {
    it('returns true when SKILL.md mentions impeccable', () => {
      const dir = writeSkill(tmp, '.claude', 'arrange', 'Invoke /impeccable first.');
      assert.equal(isImpeccableSkill(dir), true);
    });

    it('returns false when SKILL.md does not mention impeccable', () => {
      const dir = writeSkill(tmp, '.claude', 'arrange', 'This is my custom arrange skill.');
      assert.equal(isImpeccableSkill(dir), false);
    });

    it('returns false for non-existent directory', () => {
      assert.equal(isImpeccableSkill(join(tmp, 'nope')), false);
    });
  });

  describe('buildTargetNames', () => {
    it('includes both unprefixed and i-prefixed names', () => {
      const names = buildTargetNames();
      assert.ok(names.includes('arrange'));
      assert.ok(names.includes('i-arrange'));
      assert.ok(names.includes('frontend-design'));
      assert.ok(names.includes('i-frontend-design'));
      assert.equal(names.length, 12); // 6 deprecated * 2
    });
  });

  describe('findSkillsDirs', () => {
    it('finds existing harness skill directories', () => {
      mkdirSync(join(tmp, '.claude', 'skills'), { recursive: true });
      mkdirSync(join(tmp, '.agents', 'skills'), { recursive: true });
      const dirs = findSkillsDirs(tmp);
      assert.equal(dirs.length, 2);
    });

    it('ignores non-existent harness directories', () => {
      const dirs = findSkillsDirs(tmp);
      assert.equal(dirs.length, 0);
    });
  });

  describe('removeDeprecatedSkills', () => {
    it('deletes impeccable-owned deprecated skill directories', () => {
      writeSkill(tmp, '.claude', 'arrange', 'Invoke /impeccable first.');
      writeSkill(tmp, '.claude', 'normalize', 'Run impeccable teach.');
      const deleted = removeDeprecatedSkills(tmp);
      assert.equal(deleted.length, 2);
      assert.equal(existsSync(join(tmp, '.claude', 'skills', 'arrange')), false);
      assert.equal(existsSync(join(tmp, '.claude', 'skills', 'normalize')), false);
    });

    it('does NOT delete skills that do not mention impeccable', () => {
      writeSkill(tmp, '.claude', 'arrange', 'My custom layout organizer.');
      const deleted = removeDeprecatedSkills(tmp);
      assert.equal(deleted.length, 0);
      assert.equal(existsSync(join(tmp, '.claude', 'skills', 'arrange')), true);
    });

    it('deletes i-prefixed variants', () => {
      writeSkill(tmp, '.cursor', 'i-normalize', 'Invoke /impeccable first.');
      const deleted = removeDeprecatedSkills(tmp);
      assert.equal(deleted.length, 1);
      assert.equal(existsSync(join(tmp, '.cursor', 'skills', 'i-normalize')), false);
    });

    it('cleans across multiple harness directories', () => {
      writeSkill(tmp, '.claude', 'onboard', 'Run impeccable teach first.');
      writeSkill(tmp, '.agents', 'onboard', 'Run impeccable teach first.');
      writeSkill(tmp, '.cursor', 'onboard', 'Run impeccable teach first.');
      const deleted = removeDeprecatedSkills(tmp);
      assert.equal(deleted.length, 3);
    });

    it('leaves non-deprecated skills alone', () => {
      writeSkill(tmp, '.claude', 'polish', 'Invoke /impeccable first.');
      writeSkill(tmp, '.claude', 'arrange', 'Invoke /impeccable first.');
      const deleted = removeDeprecatedSkills(tmp);
      assert.equal(deleted.length, 1); // only arrange
      assert.equal(existsSync(join(tmp, '.claude', 'skills', 'polish')), true);
    });

    it('handles symlinks to deprecated skills', () => {
      // Create the canonical skill in .agents
      const canonical = writeSkill(tmp, '.agents', 'extract', 'Use impeccable extract.');
      // Create a symlink in .claude
      mkdirSync(join(tmp, '.claude', 'skills'), { recursive: true });
      symlinkSync(canonical, join(tmp, '.claude', 'skills', 'extract'));
      const deleted = removeDeprecatedSkills(tmp);
      assert.equal(deleted.length, 2); // both canonical and symlink
    });
  });

  describe('cleanSkillsLock', () => {
    it('removes impeccable-owned deprecated entries', () => {
      const lock = {
        version: 1,
        skills: {
          arrange: { source: 'pbakaus/impeccable', sourceType: 'github', computedHash: 'abc' },
          polish: { source: 'pbakaus/impeccable', sourceType: 'github', computedHash: 'def' },
          'resolve-reviews': { source: 'pbakaus/agent-reviews', sourceType: 'github', computedHash: 'ghi' },
        },
      };
      writeFileSync(join(tmp, 'skills-lock.json'), JSON.stringify(lock), 'utf-8');
      const removed = cleanSkillsLock(tmp);
      assert.deepEqual(removed, ['arrange']);
      const updated = JSON.parse(readFileSync(join(tmp, 'skills-lock.json'), 'utf-8'));
      assert.equal(updated.skills.arrange, undefined);
      assert.ok(updated.skills.polish); // not deprecated
      assert.ok(updated.skills['resolve-reviews']); // different source
    });

    it('does NOT remove entries from other sources', () => {
      const lock = {
        version: 1,
        skills: {
          extract: { source: 'some-other/package', sourceType: 'github', computedHash: 'xyz' },
        },
      };
      writeFileSync(join(tmp, 'skills-lock.json'), JSON.stringify(lock), 'utf-8');
      const removed = cleanSkillsLock(tmp);
      assert.equal(removed.length, 0);
    });

    it('handles missing skills-lock.json gracefully', () => {
      const removed = cleanSkillsLock(tmp);
      assert.equal(removed.length, 0);
    });

    it('removes i-prefixed entries', () => {
      const lock = {
        version: 1,
        skills: {
          'i-arrange': { source: 'pbakaus/impeccable', sourceType: 'github', computedHash: 'abc' },
          'i-normalize': { source: 'pbakaus/impeccable', sourceType: 'github', computedHash: 'def' },
        },
      };
      writeFileSync(join(tmp, 'skills-lock.json'), JSON.stringify(lock), 'utf-8');
      const removed = cleanSkillsLock(tmp);
      assert.equal(removed.length, 2);
    });
  });

  describe('cleanup (integration)', () => {
    it('cleans both files and lock entries in one pass', () => {
      // Set up deprecated skills in two harness dirs
      writeSkill(tmp, '.claude', 'arrange', 'Invoke /impeccable.');
      writeSkill(tmp, '.agents', 'arrange', 'Invoke /impeccable.');
      writeSkill(tmp, '.claude', 'extract', 'Run impeccable extract.');

      // Set up lock file
      const lock = {
        version: 1,
        skills: {
          arrange: { source: 'pbakaus/impeccable', sourceType: 'github', computedHash: 'a' },
          extract: { source: 'pbakaus/impeccable', sourceType: 'github', computedHash: 'b' },
          polish: { source: 'pbakaus/impeccable', sourceType: 'github', computedHash: 'c' },
        },
      };
      writeFileSync(join(tmp, 'skills-lock.json'), JSON.stringify(lock), 'utf-8');

      const result = cleanup(tmp);
      assert.equal(result.deletedPaths.length, 3);
      assert.equal(result.removedLockEntries.length, 2); // arrange + extract
      assert.equal(existsSync(join(tmp, '.claude', 'skills', 'arrange')), false);
      assert.equal(existsSync(join(tmp, '.agents', 'skills', 'arrange')), false);

      const updated = JSON.parse(readFileSync(join(tmp, 'skills-lock.json'), 'utf-8'));
      assert.ok(updated.skills.polish);
      assert.equal(updated.skills.arrange, undefined);
      assert.equal(updated.skills.extract, undefined);
    });

    it('is a no-op when nothing needs cleaning', () => {
      writeSkill(tmp, '.claude', 'polish', 'Invoke /impeccable.');
      const result = cleanup(tmp);
      assert.equal(result.deletedPaths.length, 0);
      assert.equal(result.removedLockEntries.length, 0);
    });
  });
});
