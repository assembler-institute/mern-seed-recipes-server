const db = require("../models");

async function getRecipes(_req, res, next) {
  try {
    const recipes = await db.Recipe.find({})
      .sort({ _id: -1 })
      .limit(10)
      .select(
        "_id name description difficulty image serves hoursToPrep minutesToPrep",
      )
      .lean()
      .exec();

    res.status(200).send({
      data: recipes,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function getRecipe(req, res, next) {
  try {
    const recipeID = req.params.recipeID;

    const recipe = await db.Recipe.findById(recipeID)
      .populate("author", "_id firstName lastName")
      .populate({
        path: "comments",
        select: "-__v -id -createdAt -updatedAt",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "author",
          select: "_id firstName lastName",
        },
      })
      .select("-__v")
      .lean()
      .exec();

    if (recipe) {
      res.status(200).send({
        data: recipe,
        error: null,
      });
    } else {
      res.status(404).send({
        data: null,
        error: "Recipe not found",
      });
    }
  } catch (error) {
    next(error);
  }
}

async function addRecipeComment(req, res, next) {
  try {
    const { commentBody } = req.body;
    const { recipeID } = req.params;
    const { user } = req;

    if (!user.uid) {
      return res.status(401).send({
        data: null,
        error: "Unauthorized",
      });
    }

    if (!commentBody) {
      return res.status(400).send({
        data: null,
        error: "Missing fields",
      });
    }

    const recipe = await db.Recipe.findById(recipeID);

    const comment = await db.Comment.create({
      author: user.uid,
      body: commentBody,
      recipe: recipeID,
    });

    recipe.comments.push(comment._id);

    await recipe.save();

    await comment
      .populate({
        path: "author",
        select: "firstName lastName",
      })
      .execPopulate();

    const {
      // eslint-disable-next-line no-unused-vars
      __v,
      // eslint-disable-next-line no-unused-vars
      id,
      // eslint-disable-next-line no-unused-vars
      createdAt,
      // eslint-disable-next-line no-unused-vars
      updatedAt,
      ...sanitizedComment
    } = comment.toObject();

    res.status(201).send({
      data: sanitizedComment,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteRecipeComment(req, res, next) {
  try {
    const { commentID, recipeID } = req.params;

    const deleteComment = db.Comment.findByIdAndDelete(commentID);

    const deleteRecipeComment = db.Recipe.findByIdAndUpdate(recipeID, {
      $pull: {
        comments: {
          $in: [commentID],
        },
      },
    });

    await Promise.all([deleteComment, deleteRecipeComment]);

    res.status(200).send({
      data: "Ok",
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRecipes,
  getRecipe,
  addRecipeComment,
  deleteRecipeComment,
};
