const mongo = require('mongoose');
const cerReq = require('./requestModel')

const loginSchema = mongo.Schema({
    'username':{
        type : String ,
        required : [true , "Give User name"]
    },
    'password':{
        type : String,
        required : [true , "Give Password"],
        default : "ctu@123"
    },
    'role' : {
        type : String ,
        enum: ['user','admin'],
        default : 'user'
    },
    'reqSent':[
        {
            type:mongo.Schema.Types.ObjectId,
            ref:'cerReq'
        }
    ],
    'reqRec':[
        {
            type:mongo.Schema.Types.ObjectId,
            ref:'cerReq'
        }
    ],
    'savedReq':[
        {
            type:mongo.Schema.Types.ObjectId,
            ref:'cerReq'
        }
    ]
});

module.exports = mongo.model('User',loginSchema);