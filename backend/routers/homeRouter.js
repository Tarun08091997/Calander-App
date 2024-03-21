const { createReq, getAllRequests, SaveReq, deleteSavedRequest } = require('../controller/requestController');
const { getUserSentRequests, getUserRecRequests, getUserSavedRequests } = require('../controller/userController');

const home_router = require('express').Router();

home_router.route("/:username/CreateRequest").post(createReq);
home_router.route("/getAllRequests").get(getAllRequests);
home_router.route("/:username/sentRequests").get(getUserSentRequests);
home_router.route("/:username/RecRequests").get(getUserRecRequests);
home_router.route("/:username/SavedRequests").get(getUserSavedRequests).post(SaveReq).delete(deleteSavedRequest);
module.exports = home_router;