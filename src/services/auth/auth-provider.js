const admin = require("firebase-admin");

const config = require("../../config");

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.certConfig),
});

const auth = admin.auth();

function verifyIdToken() {
  return auth.verifyIdToken;
}

function createUser({ email = "", password = "" }) {
  return auth.createUser({
    email: email,
    password: password,
  });
}

function deleteUsers(userUIDs = []) {
  return auth.deleteUsers(...userUIDs);
}

module.exports = {
  verifyIdToken: verifyIdToken,
  createUser: createUser,
  deleteUsers: deleteUsers,
};
