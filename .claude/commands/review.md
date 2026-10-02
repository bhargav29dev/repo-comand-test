---
description: Review code for bugs, security and quality
argument-hint: [file or folder path]
allowed-tools: Read, Grep, Glob
---

Review this code: $ARGUMENTS

(If no path is given, review the project's main code.)

Check:

1. **Bugs** - logic errors, edge cases, null/undefined handling
2. **Security** - hardcoded secrets, injection, weak auth, input validation
3. **Quality** - naming, duplicate code, readability, error handling
4. **Performance** - unnecessary loops, slow queries

Output format:

- For each issue: file:line, the problem, and a suggested fix
- State the severity: High / Medium / Low
- End with a 2-3 line overall summary
