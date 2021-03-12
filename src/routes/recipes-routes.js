const { Router } = require("express");

const recipesRouter = Router();

const { authMiddleware } = require("../middleware/auth-middleware");
const recipesController = require("../controllers/recipe-controller");

recipesRouter.get("/recipes", recipesController.getRecipes);

recipesRouter.get("/recipes/:recipeID", recipesController.getRecipe);

recipesRouter.post(
  "/recipes/:recipeID/comment",
  authMiddleware,
  recipesController.addRecipeComment,
);

recipesRouter.delete(
  "/recipes/:recipeID/:commentID",
  authMiddleware,
  recipesController.deleteRecipeComment,
);

module.exports = recipesRouter;
