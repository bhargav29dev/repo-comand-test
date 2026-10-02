const bcrypt = require("bcryptjs");
const {
  users,
  getNextId,
  findUserByEmail,
  findUserById,
  sanitizeUser,
} = require("../data/users");
const { addToDenylist } = require("../data/tokenDenylist");
const {
  validateName,
  validateEmail,
  validatePassword,
  parsePositiveIntId,
  normalizeEmail,
} = require("../utils/validation");

const BCRYPT_ROUNDS = 12;

function getAllUsers(req, res, next) {
  try {
    return res.status(200).json({
      users: users.map(sanitizeUser),
    });
  } catch (error) {
    next(error);
  }
}

function getUserById(req, res, next) {
  try {
    const id = parsePositiveIntId(req.params.id);

    if (id === null) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = findUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const { name, email, password, role } = req.body || {};

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

    let assignedRole = "user";
    if (role !== undefined) {
      if (role !== "user" && role !== "admin") {
        return res.status(400).json({ message: "Role must be user or admin" });
      }
      assignedRole = role;
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const newUser = {
      id: getNextId(),
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: assignedRole,
    };

    users.push(newUser);

    return res.status(201).json({
      message: "User created successfully",
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    next(error);
  }
}

function applyProfileUpdates(user, { name, email }) {
  if (name !== undefined) {
    const nameError = validateName(name);
    if (nameError) return { error: nameError };
    user.name = name.trim();
  }

  if (email !== undefined) {
    const emailError = validateEmail(email);
    if (emailError) return { error: emailError };

    const normalizedEmail = normalizeEmail(email);
    const existingUser = findUserByEmail(normalizedEmail);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already registered", status: 409 };
    }

    user.email = normalizedEmail;
  }

  if (name === undefined && email === undefined) {
    return { error: "Provide name and/or email to update" };
  }

  return { user };
}

function updateUser(req, res, next) {
  try {
    const id = parsePositiveIntId(req.params.id);

    if (id === null) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = findUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = applyProfileUpdates(user, req.body || {});

    if (result.error) {
      return res.status(result.status || 400).json({ message: result.error });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
}

function deleteUser(req, res, next) {
  try {
    const id = parsePositiveIntId(req.params.id);

    if (id === null) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent deleting the last admin
    const target = users[index];
    if (target.role === "admin") {
      const adminCount = users.filter((u) => u.role === "admin").length;
      if (adminCount <= 1) {
        return res.status(400).json({
          message: "Cannot delete the last admin user",
        });
      }
    }

    users.splice(index, 1);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

function updateCurrentUser(req, res, next) {
  try {
    const user = findUserById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = applyProfileUpdates(user, req.body || {});

    if (result.error) {
      return res.status(result.status || 400).json({ message: result.error });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
}

function deleteCurrentUser(req, res, next) {
  try {
    const index = users.findIndex((user) => user.id === req.user.userId);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    const target = users[index];
    if (target.role === "admin") {
      const adminCount = users.filter((u) => u.role === "admin").length;
      if (adminCount <= 1) {
        return res.status(400).json({
          message: "Cannot delete the last admin user",
        });
      }
    }

    users.splice(index, 1);

    if (req.user?.jti && req.user?.exp) {
      addToDenylist(req.user.jti, req.user.exp * 1000);
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateCurrentUser,
  deleteCurrentUser,
};
