const express = require("express");
const router = express.Router();

const verify_token = require("./verify_token");
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  listSearch
} = require("../controllers/product");
const { isAdmin, isAuth } = require("./auth_middleware");

const { userById } = require("../controllers/users");

router.post("/product/create/:userId", verify_token, isAuth, isAdmin, create);
router.get("/product/:productId", read);
router.delete(
  "/product/:productId/:userId",
  verify_token,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  verify_token,
  isAuth,
  isAdmin,
  update
);

router.get('/products/search',listSearch);
router.get('/products',list);
router.get('/products/related/:productId',listRelated);
router.get('/products/categories',listCategories);
router.post("/products/by/search",listBySearch);
router.get("/product/photo/:productId",photo);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
