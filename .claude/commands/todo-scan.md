---
description: Find TODO/FIXME comments, typos and unfinished work
allowed-tools: Grep, Glob, Read
---

Scan the project, skipping `node_modules`, `dist` and `coverage`.

Look for:

1. `TODO`, `FIXME`, `HACK`, `XXX` comments
2. `console.log` calls that should not ship to production
3. Unused files or exports, commented-out code
4. Naming typos in files and variables (e.g. `Dasbhaord.jsx`, `useLocaleStorage.jsx`)
5. Hardcoded URLs or ports that should come from env

Output: a grouped list with file:line, and a suggested action at the end of each group.
