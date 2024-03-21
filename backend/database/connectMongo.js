const mongo = require("mongoose");

exports.connectMongo = () =>{
    mongo
    .connect(process.env.MONGO_URI)
    .then((con)=> console.log(`DataBase connected : ${process.env.MONGO_URI}`))
    .catch((err) => console.log(err));
}