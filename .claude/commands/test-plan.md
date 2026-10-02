---
description: Write tests or a test plan for a file
argument-hint: [file path]
allowed-tools: Read, Grep, Glob, Write, Edit, Bash
---

Write tests for this file: $ARGUMENTS

Steps:

1. Read the file and list what should be tested (happy path, edge cases, errors).
2. Look at existing tests (e.g. `client/src/api/auth.test.js`) and follow their style.
3. Use Jest + Testing Library for client code. The backend has no test setup, so ask the user first whether to add Jest + supertest.
4. Write the tests and run them with `npm test` (in the client folder).
5. If a test fails, explain why and fix the cause without weakening the test.
