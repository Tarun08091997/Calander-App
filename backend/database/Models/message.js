const mongo = require('mongoose');
const requests = require('./requestModel')
const messageSchema = new mongo.Schema({
    'title':{
        type : String
    },
    'message':{
        type : String
    },
    'ceremonyDate':{
        type : Date,
        required : true
    },
    'messageDate':{
        type:Date,
        default:Date.now
    },
    'request':{
        type: mongo.Schema.Types.ObjectId,
        ref : 'requests'
    }
})

module.exports = mongo.model('message',messageSchema);