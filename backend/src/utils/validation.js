const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;
const MAX_PASSWORD = 72; // bcrypt truncates beyond 72
const MAX_NAME = 100;

function validateName(name) {
  if (!name || typeof name !== "string" || name.trim() === "") {
    return "Name is required";
  }
  if (name.trim().length > MAX_NAME) {
    return `Name must be at most ${MAX_NAME} characters`;
  }
  return null;
}

function validateEmail(email) {
  if (!email || typeof email !== "string" || email.trim() === "") {
    return "Email is required";
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return "Valid email is required";
  }
  return null;
}

function validatePassword(password, { required = true } = {}) {
  if (!password || typeof password !== "string") {
    return required ? "Password is required" : null;
  }
  if (password.length < MIN_PASSWORD) {
    return `Password must be at least ${MIN_PASSWORD} characters`;
  }
  if (password.length > MAX_PASSWORD) {
    return `Password must be at most ${MAX_PASSWORD} characters`;
  }
  return null;
}

function parsePositiveIntId(idParam) {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

module.exports = {
  EMAIL_REGEX,
  MIN_PASSWORD,
  MAX_PASSWORD,
  MAX_NAME,
  validateName,
  validateEmail,
  validatePassword,
  parsePositiveIntId,
  normalizeEmail,
};
