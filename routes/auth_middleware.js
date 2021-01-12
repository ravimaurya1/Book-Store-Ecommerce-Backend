exports.isAuth = (req,res,next) =>{
    let user = req.profile && req.user && req.profile._id == req.user._id;
    if(!user)
    {
        return res.status(403).json({
            error:"Access Denied"
        });
    }
    next();
};

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role == 0){
        return res.status(403).json({
            error: "Admin resource ! Access Denied"
        });
    }
    next();
};