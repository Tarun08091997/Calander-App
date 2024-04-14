const mongo = require('mongoose');
const requests = require('./requestModel')
const feedbackSchema = new mongo.Schema({
    'comment':{
        type : String,
        required:true
    },
    'resDate':{
        type:Date,
        default:Date.now
    },
    'request_id':{
        type: mongo.Schema.Types.ObjectId,
        ref : 'requests'
    }
});

module.exports = mongo.model('feedback',feedbackSchema);


