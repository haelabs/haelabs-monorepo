// ============================================
// DEMO RENDERER - Generic rendering for command and skill demos
// ============================================

import { getCommandDemo } from './demos/commands/index.js';
import { getSkillDemo } from './demos/skills/index.js';

/**
 * Initialize a command demo's JS after its HTML has been inserted into the DOM.
 * Call this after innerHTML is set and split compare is initialized.
 */
export function initCommandDemo(commandId, container) {
  const demo = getCommandDemo(commandId);
  if (demo && typeof demo.init === 'function') {
    const demoArea = container.querySelector('.split-after .split-content') || container;
    console.log('[initCommandDemo]', commandId, 'demoArea:', demoArea);
    demo.init(demoArea);
  }
}

/**
 * Render a command demo with split-screen comparison
 */
export function renderCommandDemo(commandId) {
  const demo = getCommandDemo(commandId);

  if (!demo) {
    // impeccable has multiple modes — show a usage guide
    if (commandId === 'impeccable') {
      return `
        <div class="demo-container">
          <div class="demo-viewport" style="padding: var(--spacing-lg); font-size: 13px; line-height: 1.6;">
            <div style="display: flex; flex-direction: column; gap: 16px; color: var(--color-ash);">
              <div style="font-size: 14px; color: var(--color-text); font-weight: 600;">Three ways to use /impeccable</div>
              <div style="display: flex; flex-direction: column; gap: 14px;">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <code style="font-size: 12px; color: var(--spread-accent, var(--color-accent)); font-weight: 600; white-space: nowrap;">/impeccable</code>
                    <span style="opacity: 0.4; font-size: 11px;">freeform</span>
                  </div>
                  <span style="padding-left: 0; opacity: 0.8;">Use on any task. Loads full design intelligence, anti-patterns, and reference knowledge into the current context.</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <code style="font-size: 12px; color: var(--spread-accent, var(--color-accent)); font-weight: 600; white-space: nowrap;">/impeccable teach</code>
                    <span style="opacity: 0.4; font-size: 11px;">one-time setup</span>
                  </div>
                  <span style="padding-left: 0; opacity: 0.8;">Scans your codebase, interviews you about brand and audience, then saves a Design Context that all other commands use automatically.</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <code style="font-size: 12px; color: var(--spread-accent, var(--color-accent)); font-weight: 600; white-space: nowrap;">/impeccable craft</code>
                    <span style="opacity: 0.4; font-size: 11px;">build a feature</span>
                  </div>
                  <span style="padding-left: 0; opacity: 0.8;">Runs /shape to plan UX first, loads the right references, then builds and iterates visually until the result delights.</span>
                </div>
              </div>
              <div style="font-size: 12px; opacity: 0.5; margin-top: 2px; font-style: italic;">Start with <code style="font-size: 11px;">/impeccable teach</code> once per project. Then use the other modes as needed.</div>
            </div>
          </div>
        </div>
      `;
    }
    // shape is a planning skill — show the process
    if (commandId === 'shape') {
      return `
        <div class="demo-container">
          <div class="demo-viewport" style="padding: var(--spacing-lg); font-size: 13px; line-height: 1.6;">
            <div style="display: flex; flex-direction: column; gap: 16px; color: var(--color-ash);">
              <div style="font-size: 14px; color: var(--color-text); font-weight: 600;">Design before you build</div>
              <div style="display: flex; flex-direction: column; gap: 14px;">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <span style="color: var(--spread-accent, var(--color-accent)); font-weight: 600; font-size: 12px;">1. Discovery</span>
                  </div>
                  <span style="opacity: 0.8;">Interviews you about purpose, audience, content, constraints, and anti-goals. Adapts questions based on your answers.</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <span style="color: var(--spread-accent, var(--color-accent)); font-weight: 600; font-size: 12px;">2. Design Brief</span>
                  </div>
                  <span style="opacity: 0.8;">Synthesizes a 9-section brief: feature summary, primary action, design direction, layout strategy, key states, interaction model, content needs, recommended references, and open questions.</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; gap: 8px; align-items: baseline;">
                    <span style="color: var(--spread-accent, var(--color-accent)); font-weight: 600; font-size: 12px;">3. Handoff</span>
                  </div>
                  <span style="opacity: 0.8;">The confirmed brief guides <code style="font-size: 11px;">/impeccable craft</code> or any other implementation approach. No code written, just the thinking that makes code good.</span>
                </div>
              </div>
              <div style="font-size: 12px; opacity: 0.5; margin-top: 2px; font-style: italic;">Use standalone or as the first step of <code style="font-size: 11px;">/impeccable craft</code>.</div>
            </div>
          </div>
        </div>
      `;
    }
    return `
      <div class="demo-container">
        <div class="demo-viewport">
          <div style="text-align: center; color: var(--color-ash); font-style: italic; padding: var(--spacing-lg);">
            Visual demo for /${commandId} coming soon
          </div>
        </div>
      </div>
    `;
  }

  // Use split-screen comparison
  return `
    <div class="demo-split-comparison" data-demo="command-${demo.id}">
      <div class="split-container">
        <div class="split-before">
          <div class="split-content">${demo.before}</div>
        </div>
        <div class="split-after">
          <div class="split-content">${demo.after || demo.before}</div>
        </div>
        <div class="split-divider"></div>
      </div>
      <div class="demo-caption">${demo.caption}</div>
    </div>
  `;
}

/**
 * Render a skill demo (with tabs if multiple demos)
 */
export function renderSkillDemo(skillId) {
  const skill = getSkillDemo(skillId);

  if (!skill || !skill.tabs || skill.tabs.length === 0) {
    return `
      <div class="demo-container">
        <div class="demo-viewport">
          <div style="text-align: center; color: var(--color-ash); padding: var(--spacing-xl);">
            <p>Demo for ${skillId.replace(/-/g, ' ')} coming soon</p>
          </div>
        </div>
      </div>
    `;
  }

  const showTabs = skill.tabs.length > 1;

  const tabs = showTabs ? skill.tabs.map((tab, i) => `
    <button class="demo-tab ${i === 0 ? 'active' : ''}" data-demo-tab="${tab.id}" data-skill="${skillId}">
      ${tab.label}
    </button>
  `).join('') : '';

  const panels = skill.tabs.map((tab, i) => `
    <div class="demo-panel ${i === 0 ? 'active' : ''}" data-demo-panel="${tab.id}">
      ${renderSkillTabDemo(skillId, tab)}
    </div>
  `).join('');

  return `
    <div class="demo-tabbed-container">
      ${showTabs ? `<div class="demo-tabs">${tabs}</div>` : ''}
      <div class="demo-panels">
        ${panels}
      </div>
    </div>
  `;
}

/**
 * Render a single skill tab demo
 */
function renderSkillTabDemo(skillId, tab) {
  const hasToggle = tab.hasToggle !== false;
  const demoId = `${skillId}-${tab.id}`;

  return `
    <div class="demo-container">
      <div class="demo-header">
        ${hasToggle ? `
          <div class="demo-toggle">
            <span class="demo-toggle-label active" id="${demoId}-before-label">Before</span>
            <button class="demo-toggle-switch" data-demo="${demoId}" role="switch" aria-checked="false" aria-labelledby="${demoId}-before-label ${demoId}-after-label"></button>
            <span class="demo-toggle-label" id="${demoId}-after-label">After</span>
          </div>
        ` : ''}
      </div>
      <div class="demo-viewport" data-state="before" id="${demoId}-viewport">
        ${tab.before}
      </div>
      <div class="demo-caption">${tab.caption}</div>
    </div>
  `;
}

/**
 * Setup demo tab switching
 */
export function setupDemoTabs() {
  document.querySelectorAll('.demo-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.demoTab;
      const container = tab.closest('.demo-tabbed-container');

      container.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      container.querySelectorAll('.demo-panel').forEach(p => p.classList.remove('active'));
      container.querySelector(`[data-demo-panel="${tabId}"]`)?.classList.add('active');
    });
  });
}



