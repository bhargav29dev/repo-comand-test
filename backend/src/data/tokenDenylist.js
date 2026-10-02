// In-memory JWT denylist (jti -> expiresAtMs). Resets on restart — intentional.
const denylist = new Map();

function addToDenylist(jti, expiresAtMs) {
  if (!jti) return;
  denylist.set(jti, expiresAtMs);
}

function isDenylisted(jti) {
  if (!jti) return false;

  const expiresAtMs = denylist.get(jti);
  if (!expiresAtMs) return false;

  if (Date.now() >= expiresAtMs) {
    denylist.delete(jti);
    return false;
  }

  return true;
}

function sweepDenylist() {
  const now = Date.now();
  for (const [jti, expiresAtMs] of denylist.entries()) {
    if (now >= expiresAtMs) {
      denylist.delete(jti);
    }
  }
}

// Periodic cleanup every 5 minutes
setInterval(sweepDenylist, 5 * 60 * 1000).unref();

module.exports = {
  addToDenylist,
  isDenylisted,
};
