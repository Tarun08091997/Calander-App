const mongo = require('mongoose');
const requests = require('./requestModel')
const feedbackSchema = new mongo.Schema({
    'comment':{
        type : String
    },
    'resDate':{
        type:Date,
        default:Date.now
    },
    'request':{
        type: mongo.Schema.Types.ObjectId,
        ref : 'requests'
    }
});

module.exports = mongo.model('feedback',feedbackSchema);


