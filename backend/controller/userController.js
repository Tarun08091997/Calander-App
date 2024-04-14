const userModel = require('../database/Models/userLoginModel');
const jwt = require("jsonwebtoken");
// CUDA 


// Read User Data

exports.getAllUsersData = async (req, res, next) => {
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch(error) {
        res.status(500).send({
            message: "Failed to retrieve users",
            error: error.message
        });
    }
};



exports.getAllUsernames = async (req,res,next) => {
    try{
        const data = await userModel.find({},"username");
        res.status(200).send(data);

    }catch(err){
        res.status(500).send({
            message: "Failed to retrieve users",
            error: err.message
        });
    }
}

exports.getAllAdminNames = async (req,res,next) => {
    try{
        const data = await userModel.find({'role':'admin'},"username");
        res.status(200).send(data);

    }catch(err){
        res.status(500).send({
            message: "Failed to retrieve users",
            error: err.message
        });
    }
}


exports.getUserByUsernames = async (req,res,next) =>{
    try{
        const b = await req.body;
        const login_user = await userModel.findOne({"username" : b.username});
        if(!login_user){
            return res.status(404).send({ message: "User not found" });
        }
        return res.status(200).send({ message: "User found" , user : login_user });
    }
    catch(err){
        res.status(500).send({
            message: "Failed to retrieve users",
            error: err.message
        });
    }
}

// Get User Sent request
exports.getUserSentRequests = async (req,res,next) =>{
    try {
        const user = await userModel.findOne({"username" : req.params.username});
        if(!user){
            return res.status(404).send({"message" : "User not found"});
        }
        res.status(200).send(user.reqSent);
    } catch(error) {
        res.status(500).send({
            message: "Failed to retrieve sent Requests",
            error: error.message
        });
    }
    
}
 
// get users Received Request
exports.getUserRecRequests = async (req,res,next) =>{
    try {
        const user = await userModel.findOne({"username" : req.params.username});
        if(!user){
            return res.status(404).send({"message" : "User not found"});
        }
        res.status(200).send(user.reqRec);
    } catch(error) {
        res.status(500).send({
            message: "Failed to retrieve Received Requests",
            error: error.message
        });
    }  
}

// Get saved Requests
exports.getUserSavedRequests = async (req,res,next) =>{
    try {
        const Saved_req = userModel.findOne({"username" : req.params.username}).savedReq;
        res.status(200).send(Saved_req);
    } catch(error) {
        res.status(500).send({
            message: "Failed to retrieve Saved Requests",
            error: error.message
        });
    }  
}

// Create User
exports.addUser = async (req, res, next) => {
   try {
        const user_body = req.body;
        const existingUser = await userModel.findOne({"username":user_body.username});
        if(existingUser){
            return res.status(400).send({message : "user already Exists"});
        }
        const new_user = new userModel(user_body);
        await new_user.save();
        res.status(201).send({
            message: "Successfully added user",
            data: new_user
        });
   } catch(err) {
        res.status(400).send({
            message: "Failed to add user",
            error: err.message
        });
   }
};


// Update
exports.updateUserByUsername = async (req, res, next) => {
    try {
        const user_name = req.params.username;
        const { user: newName, password: pass, role : user } = req.body;

        const updatedUser = await userModel.findOneAndUpdate({username : user_name}, { username: newName, password: pass , role : user }, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        res.send(updatedUser);
    } catch(error) {
        res.status(500).send({
            message: "Failed to update user",
            error: error.message
        });
    }
};







// Delete User
exports.deleteUserByUserName = async (req, res, next) => {
    try {
        const userName = req.params.username;
        const deletedUser = await userModel.deleteOne({"username" : userName});
        
        if (!deletedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send({ message: "User deleted successfully"  , 'user' : deletedUser});
    } catch(error) {
        res.status(500).send({
            message: "Failed to delete user",
            error: error.message
        });
    }
};




exports.checkLogin = async (req,res,next) => {
    try{
        const b = await req.body;
        const login_user = await userModel.findOne({"username" : b.username});
        if(!login_user){
            return res.status(404).send({ message: "User not found" });
        }
        if(login_user.password === b.password){
            const token = await login_user.userAuthToken();
            return res.status(200).send({ message: "User found" , userToken : token, user:login_user});
        }
        else{
            return res.status(400).send({ message: "Incorrect Password"});
        }
    }
    catch(err){
        res.status(500).send({
            message: "Failed to retrieve users",
            error: err.message
        });
    }
}
