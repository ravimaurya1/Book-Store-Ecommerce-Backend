const express = require("express");
const { userById, addOrderToUserHistory } = require("../controllers/users");
const router = express.Router();
const {
  create,
  listOrders,
  getStatusValues,
  orderById,
  updataOrderStatus
} = require("../controllers/orders");
const { decreaseQuantity } = require("../controllers/product");

const { isAuth, isAdmin } = require("./auth_middleware");
const verify_token = require("./verify_token");

router.post(
  "/order/create/:userId",
  verify_token,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);

router.get("/order/list/:userId", verify_token, isAuth, isAdmin, listOrders);
router.get(
  "/order/status-values/:userId",
  verify_token,
  isAuth,
  isAdmin,
  getStatusValues
);

router.put(
  "/order/:orderId/status/:userId",
  verify_token,
  isAuth,
  isAdmin,
  updataOrderStatus
);

router.param("userId", userById);
router.param("orderId",orderById);

module.exports = router;
