const db = require("../models");
const auth = require("../services/auth");

async function signUp(req, res, next) {
  try {
    const { user } = req;
    const { uid, email } = user;
    const { firstName, lastName } = req.body;

    const newUser = await db.User.create({
      _id: uid,
      email: email,
      firstName: firstName,
      lastName: lastName,
    });

    const sanitizedUser = auth.getSanitizedUser(newUser.toObject());

    res.status(201).send({
      data: {
        user: sanitizedUser,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res, next) {
  try {
    const user = await db.User.find({
      _id: req.user.uid,
    });

    res.status(200).send({
      data: {
        user: user,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res) {
  auth.logout();

  res.status(200).send({
    data: "Ok",
    error: null,
  });
}

module.exports = {
  signUp: signUp,
  logout: logout,
  me: me,
};
