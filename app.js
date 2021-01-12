const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const verify = require('./routes/verify_token');
const cors = require('cors');

//This allow to use .env variable
require('dotenv').config(); 

mongoose.set('useFindAndModify', false);

//Connecting to database
mongoose.connect(process.env.DATABASE,
    { useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (error) => {
        if(error){
            console.log("Error" + error);
        }
        else{
            console.log("Sucess");
        }
    }
); 
const app = express();

// Middleware 
app.use(morgan('dev'));                       // To see which routes is accessed
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors()); 

//Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/orders');

app.get('/ravi',(req,res)=>{
    console.log("hello there");
    res.send("hai");
})

app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes)
app.use("/api",productRoutes);
app.use("/api",braintreeRoutes);
app.use("/api",orderRoutes);

app.get("/hello",verify,(req,res) =>{
    res.send("Hello hai how are you man did you get the job man");
});

const port = process.env.PORT || 8000;


app.listen(port ,()=>{
    console.log(`Server is Running on ${port}`);
});
