function requireAdmin(req, res, next) {
  if (!req.currentUser || req.currentUser.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }
  next();
}

/** Allow if caller is admin OR targeting their own user id */
function requireSelfOrAdmin(req, res, next) {
  const targetId = Number(req.params.id);
  const isSelf = req.currentUser && req.currentUser.id === targetId;
  const isAdmin = req.currentUser && req.currentUser.role === "admin";

  if (!isSelf && !isAdmin) {
    return res.status(403).json({
      message: "Not allowed to access this user",
    });
  }

  next();
}

module.exports = {
  requireAdmin,
  requireSelfOrAdmin,
};
