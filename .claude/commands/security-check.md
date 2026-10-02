---
description: Audit auth and API security (JWT, CORS, validation, secrets)
argument-hint: [optional path, default backend/src]
allowed-tools: Read, Grep, Glob
---

Run a security audit: $ARGUMENTS

(If no path is given, check both `backend/src` and `client/src`.)

Check:

1. **Secrets** - hardcoded keys, `.env` leaks, weak `JWT_SECRET`
2. **Auth** - token verification, expiry, logout/denylist, role checks (`requireAdmin`, `requireSelfOrAdmin`)
3. **Input validation** - register, login and update endpoints
4. **Brute force** - rate limiting, password policy
5. **Client side** - token storage (`localStorage`), XSS risk, hardcoded API URL
6. **Config** - CORS origin, helmet, production-only checks

Rules:

- Never print real values from `.env`, only the key names.
- For each finding: file:line, risk, severity (High/Medium/Low), and fix.
- End with the top 3 priorities.
