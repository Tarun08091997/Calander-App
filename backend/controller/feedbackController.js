const reqModel = require('../database/Models/requestModel')
const fbModel = require('../database/Models/feedback')

exports.createFeedback = async (req, res, next) => {
    try {
        const data = req.body;
        
        const feedback = new fbModel(...data);
        
        if (!feedback) {
            return res.status(400).send({ message: "Fill Data Properly" });
        }

        const request = await reqModel.findById(req.params.request);
        if(!request){
            return res.status(404).send({ message: "Request Not found" });
        }
        
        await feedback.save();
        
        
        request.feedback.push(feedback._id);
        await request.save();
        
        return res.status(200).send({ message: "Feedback Sent", feedback: feedback });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};


exports.getFeedback = async(req,res,next) =>{

}