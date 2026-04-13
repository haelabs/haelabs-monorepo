#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const target = process.argv[2];

if (!target) {
  console.error('Usage: node tools/scripts/run-target.mjs <target>');
  process.exit(1);
}

const list = spawnSync('pnpm', ['exec', 'nx', 'show', 'projects', '--json'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  encoding: 'utf8',
});

if (list.status !== 0) {
  process.stderr.write(list.stderr || `Failed to inspect Nx projects for target ${target}.\n`);
  process.exit(list.status ?? 1);
}

let projects = [];
try {
  projects = JSON.parse(list.stdout || '[]');
} catch {
  console.error('Failed to parse Nx project list.');
  process.exit(1);
}

if (!Array.isArray(projects) || projects.length === 0) {
  console.log(`No Nx projects found for target \"${target}\". Skipping.`);
  process.exit(0);
}

const run = spawnSync('pnpm', ['exec', 'nx', 'run-many', '-t', target, '--projects', projects.join(',')], {
  stdio: 'inherit',
  encoding: 'utf8',
});

process.exit(run.status ?? 1);
