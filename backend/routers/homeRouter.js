const { createFeedback, getFeedback, feedbackSeen } = require('../controller/feedbackController');
const { createReq, getAllRequests, SaveReq, deleteSavedRequest, acceptRequest, rejectRequest, decreasePendingFeedback, updateRequest, getAllTypesRequest, getRequestsByDate, getAllTypesRequestbyUser } = require('../controller/requestController');
const { getUserSentRequests, getUserRecRequests, getUserSavedRequests } = require('../controller/userController');

const home_router = require('express').Router();

home_router.route("/:username/CreateRequest").post(createReq);
home_router.route("/getAllRequests").get(getAllRequests);
home_router.route("/getAllTypesRequest").get(getAllTypesRequest);
home_router.route("/:username/getAllTypesRequestbyUser").get(getAllTypesRequestbyUser);

home_router.route("/:username/sentRequests").get(getUserSentRequests);
home_router.route("/:username/RecRequests").get(getUserRecRequests);
home_router.route("/:username/SavedRequests").get(getUserSavedRequests).post(SaveReq).delete(deleteSavedRequest);
home_router.route("/:request/AcceptRequest").put(acceptRequest);
home_router.route("/:request/RejectRequest").put(rejectRequest);
home_router.route("/:request/CreateFeedback").post(createFeedback);
home_router.route("/:request/GetFeedback").get(getFeedback);
home_router.route("/:request/decreasePendingFeedback").put(decreasePendingFeedback);
home_router.route("/:request/UpdateRequest").put(updateRequest);
home_router.route("/:feedback/FeedbackSeen").put(feedbackSeen);
module.exports = home_router;