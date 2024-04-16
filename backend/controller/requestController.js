const requestModel = require('../database/Models/requestModel')
const userModel = require('../database/Models/userLoginModel');
// CUDA
exports.createReq = async (req, res, next) => {
    try {
        const req_body = req.body;
        const fromUsername = req.params.username;

        const fromUser = await userModel.findOne({ "username": fromUsername });
        if (!fromUser) {
            return res.status(404).send({ message: "From user not found" });
        }

        const toUsernames = req_body.to;
        if (!toUsernames || !Array.isArray(toUsernames)) {
            return res.status(400).send({ message: "Invalid 'to' field. Expected an array of usernames." });
        }

        const createdRequests = [];

        for (const toUsername of toUsernames) {
            if (fromUsername === toUsername) {
                continue; // Skip sending request to oneself
            }

            const toUser = await userModel.findOne({ "username": toUsername });
            if (!toUser) {
                return res.status(404).send({ message: `User with username '${toUsername}' not found` });
            }

            const newReq = new requestModel({
                ...req_body,
                from: fromUsername,
                to: toUsername
            });

            fromUser.reqSent.push(newReq._id);
            toUser.reqRec.push(newReq._id);

            await newReq.save();
            await fromUser.save();
            await toUser.save();

            createdRequests.push(newReq);
        }

        if(createdRequests.length == 0){
            return res.status(400).send({ message: "Fill Data Properly", requests: createdRequests });
        }else{
            return res.status(200).send({ message: "Requests Created", requests: createdRequests });
        }
    } catch (err) {
        res.status(500).send({
            message: "Can't create requests",
            error: err.message
        });
    }
}

// Save
exports.SaveReq = async (req,res,next) => {
    try{
        const req_body = req.body;
        const Loggedinuser = await userModel.findOne({"username" : req.params.username});
        req_body.from = req.params.username;
        const new_req = await requestModel(req_body);
        await new_req.save();
        Loggedinuser.savedReq.push(new_req._id);
        await Loggedinuser.save();

        return res.status(200).send({message : "Request Saved" , reqest : new_req});
    }catch(err){
        res.status(500).send({
            message: "Can't Save request",
            error: err.message
        });
    }
}


// Get all requests
exports.getAllRequests = async(req,res,next) =>{
    try {
        const all_requests= await requestModel.find();
        res.status(200).send(all_requests);
    } catch(error) {
        res.status(500).send({
            message: "Failed to retrieve requests",
            error: error.message
        });
    }
}

exports.updateRequest = async(req,res,next) =>{
    try{
        const {title : newTitle , message :  newMassage , ceremonyDate : newDate} = req.body;
        const updatedRequest = await requestModel.findByIdAndUpdate(req.params.id , {title : newTitle , message : newMassage , ceremonyDate : newDate} , {new : true});
        if(!updatedRequest){
            return res.status(404).send({message : "Error while updating request"})
        }

        return res.status(200).send(updatedRequest);
    }catch(err){
        res.status(500).send({
            message: "Failed to update request",
            error: err.message
        });
    }
}

exports.acceptRequest = async (req,res,next) =>{
    try{
        const updatedRequest = await requestModel.findByIdAndUpdate(req.params.request , {reqStatus:'accepted'} , {new : true});
        if(!updatedRequest){
            return res.status(404).send({message : "Error while updating request"})
        }
        return res.status(200).send(updatedRequest);
    }catch(err){
        res.status(500).send({
            message: "Failed to Accept request",
            error: err.message
        });
    }
}

exports.rejectRequest = async (req,res,next) =>{
    try{
        const updatedRequest = await requestModel.findByIdAndUpdate(req.params.request , {reqStatus:'canceled'} , {new : true});
        if(!updatedRequest){
            return res.status(404).send({message : "Error while updating request"})
        }
        return res.status(200).send(updatedRequest);
    }catch(err){
        res.status(500).send({
            message: "Failed to Reject request",
            error: err.message
        });
    }
}


// Delete
exports.deleteSavedRequest = async (req,res,next) =>{
    try{
        const user = await userModel.findOne({"username" : req.params.username});
        const request = await requestModel.findById(req.body.reqID);
        if(user.username === request.from){
            const index = user.savedReq.indexOf(req.body.reqID);
            await requestModel.findByIdAndDelete(req.body.reqID);
            if(index != -1){
                user.savedReq.splice(index,1);
                await user.save();
                return res.status(200).send({message : "Request Deleted"});
            }else{
                return res.status(404).send({message : "Request not found"});
            }
        }
    }
    catch(err){
        res.status(500).send({
            message: "Failed to Delete request",
            error: err.message
        });
    }
}


exports.decreasePendingFeedback = async (req, res, next) => {
    try {
        const requestId = req.params.request;

        // Validate request ID
        if (!requestId) {
            return res.status(400).send({ message: "Request ID is missing" });
        }

        // Find request by ID
        const request = await requestModel.findById(requestId);

        // Handle request not found
        if (!request) {
            return res.status(404).send({ message: "Request not found" });
        }

        // Update pendingFeedback count
        request.pendingFeedback -= 1;
        const updatedRequest = await requestModel.findByIdAndUpdate(requestId, { pendingFeedback: request.pendingFeedback }, { new: true });

        // Handle update failure
        if (!updatedRequest) {
            return res.status(500).send({ message: "Failed to update request" });
        }

        // Send updated request in the response
        return res.status(200).send(updatedRequest);
    } catch (error) {
        // Handle unexpected errors
        console.error("Error in increasePendingFeedback:", error);
        return res.status(500).send({ message: "Failed to update request", error: error.message });
    }
};