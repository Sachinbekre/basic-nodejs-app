const express = require("express");
const { postDeleteCartPage } = require("../controller/admin/ProductController");
const { getCartPage, postCartPage, deleteCartItem } = require("../controller/CartController");
const { getHomePage, getProductDetails } = require("../controller/HomeController");
const { postOrderPage, getOrderPage } = require("../controller/OrderController");
const router = express.Router();


router.get("/", getHomePage);
router.get("/products/details/:productId", getProductDetails);

router.get("/cart", getCartPage);
router.post("/cart", postCartPage);
router.post("/cart/deleteCart", deleteCartItem);
router.get("/order", getOrderPage);
router.post("/order", postOrderPage);

module.exports = router;