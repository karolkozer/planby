#!/usr/bin/env node
/**
 * planby init-ai
 * --------------
 * Wire the bundled Planby "agent skill" into a project so ANY AI coding agent
 * (Claude Code, Cursor, Windsurf, Codex, Gemini CLI, Antigravity, …) can find
 * it. The canonical content lives once inside this package (skills/planby/) and
 * each agent gets a thin pointer to it, so the docs always match the installed
 * package version.
 *
 * Usage:  npx planby init-ai
 */
'use strict';

const fs = require('fs');
const path = require('path');

const PKG = 'planby';
// This file is <pkg>/bin/init-ai.js → skill dir is <pkg>/skills/planby
const SKILL_SRC = path.join(__dirname, '..', 'skills', 'planby');
const SKILL_MD = path.join(SKILL_SRC, 'SKILL.md');

const cwd = process.cwd();
// Relative path from the project root to the installed skill (for pointer files).
const REL_SKILL = path
  .relative(cwd, SKILL_MD)
  .split(path.sep)
  .join('/');
const POINTER_TARGET = REL_SKILL.startsWith('.') ? REL_SKILL : './' + REL_SKILL;

const results = [];
function ok(msg) {
  results.push('  ✅ ' + msg);
}
function skip(msg) {
  results.push('  ⏭  ' + msg);
}
function warn(msg) {
  results.push('  ⚠️  ' + msg);
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function pointerBody(extra) {
  return (
    '# Planby — agent skill\n\n' +
    'This project uses `' +
    PKG +
    '` for schedule / timeline / agenda / planner / booking-grid / EPG UIs — any\n' +
    '"rows × time" layout.\n\n' +
    'When adding, editing, styling, or debugging any Planby component, **read the skill first**:\n\n' +
    '**`' +
    POINTER_TARGET +
    '`**\n\n' +
    'It documents the `useEpg` hook, `Epg` + `Layout` components, the three ' +
    '`render*` functions, the data schemas, and the theme. Load the files it ' +
    'references under `references/` only as needed.\n\n' +
    'It also lists what belongs to Planby PRO and must not be generated against ' +
    'this package (vertical mode, drag-and-drop, resize, week/month, timezone, ' +
    'grid, areas, mobile).\n' +
    (extra || '')
  );
}

/* 1. Claude Code / Agent SDK — .claude/skills/planby (symlink, fallback copy) */
function setupClaude() {
  const dest = path.join(cwd, '.claude', 'skills', 'planby');
  try {
    ensureDir(path.dirname(dest));
    if (fs.existsSync(dest) || isSymlink(dest)) {
      skip('.claude/skills/planby already exists');
      return;
    }
    try {
      fs.symlinkSync(SKILL_SRC, dest, 'dir');
      ok('.claude/skills/planby → symlink to ' + POINTER_TARGET.replace('/SKILL.md', ''));
    } catch (e) {
      copyDir(SKILL_SRC, dest);
      ok('.claude/skills/planby (copied — symlink unavailable)');
    }
  } catch (e) {
    warn('.claude/skills: ' + e.message);
  }
}

/* 2. Cursor — .cursor/rules/planby.mdc */
function setupCursor() {
  const dest = path.join(cwd, '.cursor', 'rules', 'planby.mdc');
  writePointer(
    dest,
    '---\n' +
      'description: Planby (planby) schedule / timeline / agenda / planner / EPG\n' +
      'globs: ["**/*.tsx", "**/*.jsx", "**/*.ts"]\n' +
      'alwaysApply: false\n' +
      '---\n\n' +
      pointerBody(),
    '.cursor/rules/planby.mdc'
  );
}

/* 3. Windsurf — .windsurf/rules/planby.md */
function setupWindsurf() {
  const dest = path.join(cwd, '.windsurf', 'rules', 'planby.md');
  writePointer(dest, pointerBody(), '.windsurf/rules/planby.md');
}

/* 4. AGENTS.md — Codex / Gemini CLI / Antigravity / generic */
function setupAgentsMd() {
  const dest = path.join(cwd, 'AGENTS.md');
  const marker = '<!-- planby:start -->';
  const endMarker = '<!-- planby:end -->';
  const section = marker + '\n' + pointerBody().replace(/^# /, '## ') + endMarker + '\n';
  try {
    let content = '';
    if (fs.existsSync(dest)) content = fs.readFileSync(dest, 'utf8');
    if (content.includes(marker)) {
      const re = new RegExp(marker + '[\\s\\S]*?' + endMarker + '\\n?');
      content = content.replace(re, section);
      fs.writeFileSync(dest, content);
      ok('AGENTS.md (updated Planby section)');
    } else {
      const sep = content && !content.endsWith('\n') ? '\n\n' : content ? '\n' : '';
      fs.writeFileSync(dest, content + sep + section);
      ok(content ? 'AGENTS.md (appended Planby section)' : 'AGENTS.md (created)');
    }
  } catch (e) {
    warn('AGENTS.md: ' + e.message);
  }
}

/* helpers */
function isSymlink(p) {
  try {
    return fs.lstatSync(p).isSymbolicLink();
  } catch (e) {
    return false;
  }
}
function writePointer(dest, body, label) {
  try {
    ensureDir(path.dirname(dest));
    const existed = fs.existsSync(dest);
    fs.writeFileSync(dest, body);
    ok(label + (existed ? ' (updated)' : ''));
  } catch (e) {
    warn(label + ': ' + e.message);
  }
}
function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

/* main */
function main() {
  if (!fs.existsSync(SKILL_MD)) {
    console.error(
      'planby init-ai: could not find the bundled skill at\n  ' +
        SKILL_MD +
        '\nMake sure ' +
        PKG +
        ' is installed.'
    );
    process.exit(1);
  }

  console.log('\nPlanby — wiring the AI skill into this project…\n');
  setupClaude();
  setupCursor();
  setupWindsurf();
  setupAgentsMd();

  console.log(results.join('\n'));
  console.log(
    '\nDone. Agents that read the above files will now know how to build Planby.\n' +
      'For ChatGPT / other tools without a rules file, paste the contents of:\n  ' +
      POINTER_TARGET +
      '\n'
  );
}

main();
