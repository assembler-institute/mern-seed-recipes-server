const express = require("express");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const errorMiddleware = require("./middleware/error-middleware");
const userRouter = require("./routes/user-routes");
const recipesRouter = require("./routes/recipes-routes");
const config = require("./config");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());

app.use(
  cors({
    origin: config.client.URL,
  }),
);

app.use(userRouter);
app.use(recipesRouter);

app.use(errorMiddleware);

module.exports = app;
