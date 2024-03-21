const app = require('./app');
const {connectMongo }= require('./database/connectMongo')
const loginRouter = require('./routers/loginRouter');
const bodyParser = require('body-parser')
const signupRouter = require('./routers/signupRouter');
const home_router = require('./routers/homeRouter');
//connect mongo
connectMongo();

app.use(bodyParser.json());

// Routers
app.use('/api/v1/login',loginRouter);
app.use('/api/v1/signup',signupRouter);
app.use('/api/v1',home_router);

// Create server
app.listen(process.env.PORT , ()=>{
    console.log(`Server has started on port ${process.env.PORT}`)
})