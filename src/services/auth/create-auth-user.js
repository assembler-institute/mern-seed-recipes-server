const { createUser } = require("./auth-provider");

function createAuthUser({ email = "", password = "" }) {
  return createUser({ email, password });
}

module.exports = {
  createAuthUser: createAuthUser,
};
