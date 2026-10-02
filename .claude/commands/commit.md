---
description: Review changes and create a good git commit
argument-hint: [optional commit message hint]
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git commit:*)
---

Create a git commit. Hint (if given): $ARGUMENTS

Steps:

1. Run `git status` and `git diff` (staged and unstaged). Run `git log --oneline -5` to match the recent commit style.
2. If this is not a git repo, say so and stop (do not run `git init` yourself).
3. **Never commit** these: `.env`, `node_modules/`, `client/dist/`, `client/coverage/`, `*.log`. If any are staged or missing from `.gitignore`, warn first.
4. Stage only the relevant files by name with `git add` (avoid `git add .` and `-A`).
5. Write the commit message:
   - First line: imperative mood, 50-72 chars (e.g. `Add change-password endpoint`)
   - If needed, add a blank line and 1-3 bullets explaining why
   - One logical change per commit; if the changes are unrelated, suggest separate commits
6. End the commit message with this line:
   `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`
7. After committing, verify with `git status` and show the final message and commit hash.

Rules:

- Do not use `git push`, `--amend`, `--no-verify`, or force flags.
- If a hook fails, explain why and fix it instead of bypassing it.
