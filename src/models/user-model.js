const mongoose = require("mongoose");
const { isEmail } = require("validator");
require("dotenv").config();

const UserSchema = new mongoose.Schema(
  {
    _id: String,
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: isEmail,
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
