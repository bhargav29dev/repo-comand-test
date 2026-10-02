const bcrypt = require("bcryptjs");
const {
  users,
  getNextId,
  findUserByEmail,
  findUserById,
  getRoleForNewUser,
  sanitizeUser,
} = require("../data/users");
const { generateAccessToken } = require("../utils/token");
const { addToDenylist } = require("../data/tokenDenylist");
const {
  validateName,
  validateEmail,
  validatePassword,
  normalizeEmail,
} = require("../utils/validation");

const BCRYPT_ROUNDS = 12;

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body || {};

    const nameError = validateName(name);
    if (nameError) return res.status(400).json({ message: nameError });

    const emailError = validateEmail(email);
    if (emailError) return res.status(400).json({ message: emailError });

    const passwordError = validatePassword(password);
    if (passwordError) return res.status(400).json({ message: passwordError });

    const normalizedEmail = normalizeEmail(email);

    if (findUserByEmail(normalizedEmail)) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const newUser = {
      id: getNextId(),
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: getRoleForNewUser(),
    };

    users.push(newUser);

    return res.status(201).json({
      message: "User registered successfully",
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};

    const emailError = validateEmail(email);
    if (emailError) return res.status(400).json({ message: emailError });

    if (!password || typeof password !== "string") {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = findUserByEmail(normalizeEmail(email));

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
}

function logout(req, res, next) {
  try {
    if (req.user?.jti && req.user?.exp) {
      addToDenylist(req.user.jti, req.user.exp * 1000);
    }

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
}

function getMe(req, res, next) {
  try {
    return res.status(200).json({
      user: sanitizeUser(req.currentUser),
    });
  } catch (error) {
    next(error);
  }
}

async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body || {};

    if (!currentPassword || typeof currentPassword !== "string") {
      return res.status(400).json({ message: "Current password is required" });
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      return res.status(400).json({ message: `New password: ${passwordError.replace("Password", "password")}` });
    }

    const user = findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matches = await bcrypt.compare(currentPassword, user.password);
    if (!matches) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    if (req.user?.jti && req.user?.exp) {
      addToDenylist(req.user.jti, req.user.exp * 1000);
    }

    return res.status(200).json({
      message: "Password changed successfully. Please login again.",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  logout,
  getMe,
  changePassword,
};
