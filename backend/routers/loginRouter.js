const { checkLogin, getAllUsernames } = require('../controller/userController');

const loginRouter = require('express').Router();

loginRouter.route("/").get(getAllUsernames)
loginRouter.route("/submit").post(checkLogin)

module.exports = loginRouter;