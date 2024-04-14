const { addUser,  getAllUsersData, updateUserByUsername, deleteUserByUserName, getUserByUsernames ,getAllAdminNames} = require('../controller/userController');

const signupRouter = require('express').Router();

signupRouter.route("/").post(addUser).get(getAllUsersData);
signupRouter.route("/admin").get(getAllAdminNames);
signupRouter.route("/:username").put(updateUserByUsername).delete(deleteUserByUserName).get(getUserByUsernames);

module.exports = signupRouter;