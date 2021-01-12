const express = require('express');
const router = express.Router();

const verify_token = require('./verify_token');

const {userById, read, update, purchaseHistory} = require('../controllers/users');

const {isAuth, isAdmin} = require('./auth_middleware');

router.get("/secret/:userId",verify_token,isAuth,isAdmin,(req,res)=>{
    res.json({
        user:req.profile
    });
});
router.get('/user/:userId',verify_token,isAuth,read);
router.put('/user/:userId',verify_token,isAuth,update);
router.get("/orders/by/user/:userId",verify_token,isAuth,purchaseHistory);

router.param("userId",userById);

module.exports = router;
