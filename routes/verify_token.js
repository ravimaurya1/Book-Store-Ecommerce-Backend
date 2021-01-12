const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    let token = req.header('token');
    if(!token) return res.status('401').json({error:'Access Denied'});
    try{
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        //console.log(verified);
        next();
    }catch(error)
    {
        res.status(400).send("Invalid Token");
    }
};
