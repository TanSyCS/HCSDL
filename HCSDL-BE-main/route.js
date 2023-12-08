const express = require("express");
const adminRouter = express.Router();
const userController = require("./controller/admin.controller");

adminRouter.get("/film", userController.getFilm);
module.exports = adminRouter;
