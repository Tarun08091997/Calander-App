const reqModel = require('../database/Models/requestModel')
const fbModel = require('../database/Models/feedback')

exports.createFeedback = async (req, res, next) => {
    
    try {
        const data = req.body;
        const request = await reqModel.findById(req.params.request);
            if(!request){
                return res.status(404).send({ message: "Request Not found" });
            }
        const feedback = new fbModel(data);
        if (!feedback) {
                return res.status(400).send({ message: "Fill Data Properly" });
        }
        await feedback.save();
        await request.save();
        request.feedback.push(feedback._id);
        return res.status(200).send({ message: "Feedback Sent", feedback: feedback });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};


exports.getFeedback = async (req, res, next) => {
    try {
        const feedback = await fbModel.find({ request_id: req.params.request }, ["comment", "resDate", "seen"]);
        return res.status(200).send(feedback);
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};

exports.feedbackSeen = async (req, res, next) => {
    try {
        const feedbackId = req.params.feedback; // Assuming feedbackId is passed in the params
        // Find the feedback document by ID and update the 'seen' field to true
        const feedback = await fbModel.findByIdAndUpdate(feedbackId, { seen: true }, { new: true });

        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }

        // Respond with the updated feedback document
        res.status(200).json({ message: "Feedback marked as seen", feedback: feedback });
    } catch (error) {
        // If an error occurs during the process, handle it here
        console.error("Error marking feedback as seen:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
