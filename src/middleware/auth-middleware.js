const {
  getAuthToken,
  verifyAuthToken,
  login,
  logout,
} = require("../services/auth");

async function authMiddleware(req, res, next) {
  try {
    const bearerToken = await getAuthToken(req.headers);
    const userClaims = await verifyAuthToken(bearerToken);

    login(req, userClaims);

    next();
  } catch (error) {
    logout();

    return res.status(401).send({
      data: null,
      error: "Unauthorized",
    });
  }
}

module.exports = {
  authMiddleware: authMiddleware,
};
