---
name: signoz-i18n-rebase
description: Use this skill when syncing, merging, or rebasing the SigNoz `feat/i18n` branch or any large long-lived i18n/translation branch with `main`, especially when conflicts mix business logic changes with translated UI strings, locale JSON files, React i18next usage, Infra Monitoring K8s V2 files, dashboards, alerts, logs, or quick filters. For long-term shared maintenance, prefer merging `main` into the i18n branch; reserve rebase for short-lived local work or final history cleanup. This skill guides conflict resolution so current `main` business behavior wins while translated content and new locale keys are preserved and adapted to the new structure.
---

# SigNoz I18n Branch Sync

Use this skill to sync a large translation/i18n branch with `main` in the SigNoz repository. The core rule is:

- Business logic, component structure, deleted files, API contracts, and current feature behavior follow `main`.
- Translation content, locale keys, and i18n wrappers from the i18n branch are preserved when they still fit the `main` structure.

## Strategy Selection

Default to merge for a long-lived shared branch such as `feat/i18n`.

Use `git merge main` when:

- The i18n branch is shared remotely or has already been pushed.
- Multiple agents or developers may continue from the branch.
- The branch will be maintained for a long time and synced with `main` repeatedly.
- Conflict decisions need to remain auditable as integration points.
- Avoiding force-push risk is more important than a linear history.

Use `git rebase main` only when:

- The branch is short-lived, local, or clearly owned by one person.
- The work has not been shared, or force-push has been explicitly accepted.
- The user asks for final PR cleanup, squash preparation, or a linear history.
- You have confirmed that rewriting branch history will not disrupt others.

For SigNoz i18n maintenance, the recommended steady-state workflow is:

1. Keep `feat/i18n` as a long-lived branch.
2. Periodically merge latest `main` into `feat/i18n`.
3. Resolve conflicts by taking `main` business logic and adapting translation content to it.
4. Push the merge commit normally.
5. Consider rebase or squash only at the final PR/release boundary if the project explicitly wants a cleaner history.

## Merge Workflow

1. Confirm the starting state.
   - Run `git status --short --branch`.
   - Verify the current branch is the intended i18n branch.
   - Do not start merge with uncommitted unrelated changes.

2. Confirm what `main` means.
   - Run `git fetch origin main`.
   - Check `git branch -vv`, `git rev-parse main origin/main HEAD`, and recent log if refs look surprising.
   - Make sure local `main` represents the online `origin/main` intended by the user. If needed from a non-`main` branch, fast-forward it with `git fetch origin main:main`.

3. Run the merge.
   - Use `git merge main`.
   - If the merge auto-commits, still inspect the result before pushing.
   - If conflicts appear, resolve them in small batches and commit the merge after validation.

4. Resolve conflicts in small batches.
   - First list unresolved files with `git status --short`.
   - Find markers with `rg -n "^(<<<<<<<|=======|>>>>>>>)" .`.
   - Prefer reading both sides with `git show :2:path` and `git show :3:path` before editing.

5. Finish and push only after checks pass.
   - Run the validation commands in this skill.
   - Confirm `git status --short --branch` is clean.
   - Push normally with `git push` when the user asked for push or the workflow clearly requires publishing the merge.

## Rebase Workflow

Use this workflow for short-lived branches or final cleanup, not as the default long-term maintenance path for `feat/i18n`.

1. Confirm the starting state.
   - Run `git status --short --branch`.
   - Verify the current branch is the intended i18n branch.
   - Do not start rebase with uncommitted unrelated changes.

2. Confirm what `main` means.
   - Run `git fetch origin main`.
   - Check `git branch -vv`, `git rev-parse main origin/main HEAD`, and recent log if refs look surprising.
   - Rebase onto the actual local `main` ref requested by the user. If an earlier fetch/log shows a newer commit than local `main`, verify before declaring success.

3. Run the rebase.
   - Use `git rebase main`.
   - If `git rebase --continue` needs an editor in a non-interactive terminal, use `GIT_EDITOR=true git rebase --continue`.
   - Force-push only when the user explicitly accepts rewriting the remote branch.

4. Resolve conflicts in small batches.
   - First list unresolved files with `git status --short`.
   - Find markers with `rg -n "^(<<<<<<<|=======|>>>>>>>)" .`.
   - Prefer reading both sides with `git show :2:path` and `git show :3:path` before editing.

## Conflict Strategy

### Business Logic Wins From Main

When conflicts touch current behavior, routing, query APIs, pagination, feature flags, deleted components, generated API usage, or renamed props, keep `main`.

Examples from the SigNoZ i18n rebase:

- Alert history timeline:
  - Keep `main` cursor pagination/query cancellation and top-level query-search behavior.
  - Do not resurrect an older label-filter column API if the current `main` table no longer calls it.

- Infra Monitoring K8s V2:
  - If `main` deleted files such as obsolete side panels or cell tooltip components, keep them deleted.
  - Do not reintroduce old `K8sFiltersSidePanel` or old table control structures from the i18n branch.
  - Use `main` components like `K8sOptionsSidePanel`, `K8sTableToolbar`, and current table/list props as the structural baseline.

- Type/API conflicts:
  - Keep generated schema imports and current DTO types from `main`.
  - Remove unused type aliases introduced only by old payload code.

### Translation Content Is Adapted, Not Dropped

Preserve translation work by adapting it to current `main` code:

- Keep `useTranslation(...)` imports when the component still renders user-visible strings.
- Keep `t(...)`, `translateInfraText`, `translateInfraKey`, and `translateInfraNode` when they fit the current component structure.
- When `main` changed a component API, move the translation call to the new API rather than restoring the old component shape.
- If a new `labelKey` appears in config objects, update the corresponding interface with optional `labelKey?: string` only if the field is still meaningful.
- If a translated key is used but missing from locale files, add both English and `zh-CN` values.

### Locale JSON

For locale conflicts:

- Preserve both sides' keys when possible.
- New strings introduced by `main` should get English and Chinese entries.
- New Chinese entries should be actual translations, not copied English, unless product terms are intentionally kept in English.
- Run `pnpm i18n:check` after resolving locale changes.

### Previously Resolved Rebase Lessons

Carry these decisions forward during future merge or rebase conflicts:

- Do not restore obsolete i18n-side business structures just because they contain translations.
- If `main` renamed, deleted, or reorganized a component, keep the `main` structure and move the translation wrapper or locale key into the new location.
- If browser UI appears to show conflict markers after a successful check, verify with CLI first; stale browser cache can show old compiled text.
- Treat conflict-marker search as authoritative for source files: `rg -n "^(<<<<<<<|=======|>>>>>>>)" .`.
- Before pushing after a large conflict resolution, run marker search and status checks again even if the merge/rebase command reports success.

## Common File Patterns

### Infra Monitoring Helper

If i18n code imports `container/InfraMonitoringK8s/i18n`, ensure `frontend/src/container/InfraMonitoringK8s/i18n.tsx` exists and remains tracked.

Use these helpers for old literal text mapped through the infra locale namespace:

- `translateInfraText(t, text)`
- `translateInfraKey(t, key, fallback)`
- `translateInfraNode(t, node)`

### Column Headers

For `ColumnHeader` and `EntityGroupHeader`:

- Keep the current `main` props and behavior.
- Add optional props like `titleKey?: string` and `tooltipKey?: string` when config files already provide them.
- Translate:
  - child nodes with `translateInfraNode`
  - titles with `titleKey` fallback or `translateInfraText`
  - docs tooltip fallback such as `Not sure what this means?`
  - docs link text such as `Learn more.`

### Status Counts And Entity Counts

If status/count configs include `labelKey`:

- Add `labelKey?: string` to the relevant item interface.
- Translate labels before rendering.
- For tooltips with interpolation, reuse existing keys such as `k8s.view_entity_of_selected_item` when available.

### QuickFilters

For QuickFilters checkbox conflicts:

- Keep callback props from `main`, especially `onQuickFilterChange`.
- Also keep `useTranslation('common')`.
- Translate visible strings such as:
  - `quick_filters.filter_values`
  - `quick_filters.no_values_found`
  - `quick_filters.show_more`
  - `quick_filters.all`
  - `quick_filters.only`

## Validation

Follow the repository instruction to verify with CLI checks. Do not use Playwright for this workflow.

After each significant conflict batch:

```bash
rg -n "^(<<<<<<<|=======|>>>>>>>)" .
git diff --check
pnpm exec tsgo --noEmit
pnpm i18n:check
```

If `pnpm lint:js` is useful, run it, but be aware that the full repo can fail on pre-existing warnings. Prefer targeted `oxlint` for files touched during conflict resolution:

```bash
pnpm exec oxlint path/to/file.tsx path/to/other-file.ts
```

At the end:

```bash
git status --short --branch
git merge-base --is-ancestor main HEAD; echo $?
rg -n "^(<<<<<<<|=======|>>>>>>>)" .
git diff --check
pnpm exec tsgo --noEmit
pnpm i18n:check
```

Interpretation:

- `git merge-base --is-ancestor main HEAD` should return `0`.
- `rg` returns exit code `1` when no conflict markers are found; that is good.
- `git status --short --branch` should show a clean worktree after merge or rebase completes.

## Final Report

In the final response, summarize:

- The target branch and `main` commit used.
- Whether sync used merge or rebase.
- Whether a merge commit was created, or whether history was rewritten.
- Key conflict decisions, especially where old i18n-side structure was not restored because `main` had newer business logic.
- Checks run and their pass/fail result.
- Whether the branch is ahead/behind remote and whether push was performed or intentionally not performed.
