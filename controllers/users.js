const User = require("../models/user");
const {Order} = require("../models/order"); 
const bcrypt = require('bcryptjs');

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = async(req, res) => {
  let hashedPassword = null;
  try{
    console.log(req.body);
    const salt  = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password,salt);
  }
  catch(error){
    console.log("ravi error is here",error);
  }
    req.body.hashed_password = hashedPassword;
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "you are not authorise to perform this action",
        });
      }
      user.hashed_password = undefined;
      res.json(user);
    }
  );
};

exports.addOrderToUserHistory = (req, res, next) => {
  let history = [];

  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.cateogry,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error,data) => {
        if(error){
            return res.status(400).json({
                error:'Could not update user purchase history'
            })
        }
        next();
    }
  );
};

exports.purchaseHistory = (req,res) =>{
  Order.find({user:req.profile._id})
  .populate('user','_id name')
  .sort('-created')
  .exec((err,orders)=>{
    if(err){
      return res.status(400).json({
        error:"Error while reteriving purcahse history"
      });
    }
    res.json(orders);
  });
};