const express = require("express");
const router = express.Router();
const verify_token = require("./verify_token");
const { create, categoryById, read, update, remove, list } = require("../controllers/category");
const { isAdmin, isAuth } = require("./auth_middleware");

const { userById } = require("../controllers/users");

router.post("/category/create/:userId", verify_token, isAuth, isAdmin, create);
router.get("/category/:categoryId", read);
router.put(
  "/category/:categoryId/:userId",
  verify_token,
  isAuth,
  isAdmin,
  update
);
router.delete(
  "/category/:categoryId/:userId",
  verify_token,
  isAuth,
  isAdmin,
  remove
);
router.get("/categories",list);


router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
