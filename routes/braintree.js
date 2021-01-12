const express = require('express');
const { userById } = require('../controllers/users');
const router = express.Router();
const { generateToken,processPayment } = require('../controllers/braintree');

const {isAuth, isAdmin} = require('./auth_middleware');
const verify_token = require('./verify_token');


router.get('/braintree/getToken/:userId',verify_token,isAuth,generateToken);
router.post('/braintree/payment/:userId',verify_token,isAuth,processPayment);

router.param('userId',userById);

module.exports = router;