---
description: Generate documentation for all backend API endpoints
allowed-tools: Read, Grep, Glob
---

Read `backend/src/routes` and `backend/src/controllers` and write API docs.

For each endpoint, list:

- Method and path (e.g. `POST /api/auth/login`)
- Auth required? (Bearer token / admin / self-or-admin)
- Request body and params (validation rules from `utils/validation.js`)
- Success response and status code
- Error responses (400/401/403/404/409, etc.)

End with an example `curl` flow: register, login, then call `/me`.
