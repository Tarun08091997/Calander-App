const { checkLogin, getAllUsernames ,getAllAdminNames} = require('../controller/userController');

const loginRouter = require('express').Router();

loginRouter.route("/").get(getAllUsernames)
loginRouter.route("/admin").get(getAllAdminNames);
loginRouter.route("/submit").post(checkLogin)

module.exports = loginRouter;