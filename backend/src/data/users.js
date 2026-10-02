// In-memory users store (resets on server restart — intentional for practice)
const users = [];

let nextId = 1;

function getNextId() {
  return nextId++;
}

function findUserByEmail(email) {
  return users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
}

function findUserById(id) {
  return users.find((user) => user.id === id);
}

/**
 * First registered user becomes admin; others are regular users.
 * Admin can manage all users. Regular users manage only themselves via /me.
 */
function getRoleForNewUser() {
  return users.length === 0 ? "admin" : "user";
}

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

module.exports = {
  users,
  getNextId,
  findUserByEmail,
  findUserById,
  getRoleForNewUser,
  sanitizeUser,
};
