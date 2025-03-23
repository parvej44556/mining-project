const { Router } = require("express");
const { signup, login, users } = require("./authController.js");

const authRouter = Router();
authRouter.get("/users", users);
authRouter.post("/signup", signup);
authRouter.post("/login", login);

module.exports = authRouter;
