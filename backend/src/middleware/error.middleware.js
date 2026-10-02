function notFoundHandler(req, res, next) {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === "production";

  console.error("Error:", err.message);
  if (!isProd && err.stack) {
    console.error(err.stack);
  }

  const message =
    statusCode >= 500 && isProd
      ? "Internal server error"
      : err.message || "Internal server error";

  res.status(statusCode).json({ message });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
