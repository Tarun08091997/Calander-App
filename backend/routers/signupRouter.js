const { addUser,  getAllUsersData, updateUserByUsername, deleteUserByUserName, getUserByUsernames } = require('../controller/userController');

const signupRouter = require('express').Router();

signupRouter.route("/").post(addUser).get(getAllUsersData);
signupRouter.route("/:username").put(updateUserByUsername).delete(deleteUserByUserName).get(getUserByUsernames);

module.exports = signupRouter;