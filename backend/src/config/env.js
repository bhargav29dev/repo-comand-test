function loadEnv() {
  const required = ["JWT_SECRET"];

  for (const key of required) {
    if (!process.env[key] || String(process.env[key]).trim() === "") {
      console.error(`Missing required env: ${key}`);
      process.exit(1);
    }
  }

  const secret = process.env.JWT_SECRET;
  const isProd = process.env.NODE_ENV === "production";

  if (isProd && secret.length < 32) {
    console.error("JWT_SECRET must be at least 32 characters in production");
    process.exit(1);
  }

  if (
    secret === "my_super_secret_jwt_key_change_in_production" &&
    isProd
  ) {
    console.error("Replace the placeholder JWT_SECRET before production use");
    process.exit(1);
  }

  return {
    nodeEnv: process.env.NODE_ENV || "development",
    isProd,
    port: Number(process.env.PORT) || 5000,
    jwtSecret: secret,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
    cookieSecure: String(process.env.COOKIE_SECURE).toLowerCase() === "true",
    cookieSameSite: (process.env.COOKIE_SAME_SITE || "lax").toLowerCase(),
    cookieName: process.env.COOKIE_NAME || "accessToken",
  };
}

module.exports = { loadEnv };
