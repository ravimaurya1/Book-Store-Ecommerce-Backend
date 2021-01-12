const router = require('express').Router();
const User = require('../models/user');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');

router.post('/signup',async (req,res)=>{

    // Lets validate the data before user is created
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json({error:error.details[0].message});

    // Checking if the user is alreday in the database
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).json({error:"Email already exist"});

    // Hash passwords
    const salt  = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    // Creating new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        hashed_password: hashedPassword,
        about: req.body.about,
        role: req.body.role,
        history: req.body.history
    });     

    try{
        const saved = await user.save();
        res.send(saved);
    }
    catch(error){
        res.status(400);
        res.send(error);
    }
});

// Login
router.post('/signin',async(req,res)=>{
    // Lets validate
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send({error: error.details[0].message});

    // Checking if the user exist or not
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send({error:"Email doesn't exist"});

    // Password is Correct
    const validPass = await bcrypt.compare(req.body.password,user.hashed_password);
    if(!validPass) return res.status(400).send({error:"Password is invalid"});
    
    // Create and assign token
    const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);
    // Persist the token as 't' in cookie with expiry date 
    res.cookie('t',token,{expire: new Date() + 9999});
    // return response with user and token to frontend client
    const {_id,name,email,role} = user;

    return res.json({token,user:{_id,name,email,role}});
});

// Signout

router.get('/signout',(req,res)=>{
    res.clearCookie("t");
    res.json({message:"Signout sucess"});
});

module.exports = router;