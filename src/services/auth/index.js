const { verifyAuthToken } = require("./verify-auth-token");
const { getAuthToken } = require("./get-auth-token");
const { getSanitizedUser } = require("./get-sanitized-user");
const { login } = require("./login");
const { logout } = require("./logout");
const { createAuthUser } = require("./create-auth-user");

module.exports = {
  verifyAuthToken: verifyAuthToken,
  getAuthToken: getAuthToken,
  getSanitizedUser: getSanitizedUser,
  login: login,
  logout: logout,
  createAuthUser: createAuthUser,
};
