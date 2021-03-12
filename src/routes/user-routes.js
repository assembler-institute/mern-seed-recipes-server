const { Router } = require("express");

const userRouter = Router();

const { authMiddleware } = require("../middleware/auth-middleware");
const userController = require("../controllers/user-controller");

userRouter.post("/user/sign-up", userController.signUp);
userRouter.post("/user/logout", authMiddleware, userController.logout);
userRouter.get("/user/me", authMiddleware, userController.me);

module.exports = userRouter;
