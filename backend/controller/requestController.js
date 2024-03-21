const requestModel = require('../database/Models/requestModel')
const userModel = require('../database/Models/userLoginModel');
// CUDA

// create
exports.createReq = async (req,res,next) => {
    try{
        const req_body = req.body;
        req_body.from = req.params.username;
        const new_req = await requestModel(req_body);
        const from_user = await userModel.findOne({"username":req.params.username});
        const to_user = await userModel.findOne({"username":req_body.to});
        if(from_user === to_user){
            return res.status(500).send({message : "can't send request to yourself"});
        }
        if(!to_user){
            return res.status(404).send({message : "to_user not found"})
        }
        from_user.reqSent.push(new_req._id);
        to_user.reqRec.push(new_req._id);
        await new_req.save();
        await from_user.save();
        await to_user.save();

        return res.status(200).send({message : "Request Created" , reqest : new_req});
    }catch(err){
        res.status(500).send({
            message: "Can't create request",
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