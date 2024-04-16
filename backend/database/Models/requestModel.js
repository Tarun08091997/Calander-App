const mongo = require('mongoose')
const user = require('./userLoginModel')
const feedback= require('./feedback')
const updates = require('./message');

const requestSchema = mongo.Schema({
    'from':{
        type : String
    },
    'to':{
        type : String
    },
    'title':{
        type : String,
        required : true
    },
    'message':{
        type : String
    },
    'ceremonyDate':{
        type : Date,
        required : true
    },
    'reqDate':{
        type : Date,
        default: Date.now,
        required : true
    },
    'reqStatus':{
        type : String ,
        enum: ['pending','accepted','canceled'],
        default : 'pending'
    },
    "feedback" : [
        {
            type : mongo.Schema.Types.ObjectId ,
            ref : 'feedback'
        }
    ],
    "updates" : [
        {
            type : mongo.Schema.Types.ObjectId ,
            ref : 'message'
        }
    ],
    "coordinatorName":{
        type: String
    },
    "CoordinatorNumber":{
        type:String
    },
    "place":{
        type:String
    },
    "vanue":{
        type:String
    },
    "saved":{
        type:Boolean,
        default: true
    },
    "pendingFeedback":{
        type:Number,
        default:0
    }
});

module.exports = mongo.model('request',requestSchema);