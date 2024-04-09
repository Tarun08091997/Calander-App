const mongo = require('mongoose');
const jwt = require("jsonwebtoken");

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
    ],
    'tokens':[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});


// Token genrate
loginSchema.methods.userAuthToken = async function(){
    let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token});
    await this.save();
    return token;
}
module.exports = mongo.model('User',loginSchema);