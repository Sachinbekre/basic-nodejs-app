const express = require("express");
const router = express.Router();

const { getProducts, addProduct, getAdminProductPage, getEditProductPage, postEditProductPage, postDeleteProductPage } = require("../controller/admin/ProductController");

router.get('/',getAdminProductPage);

router.get("/add", getProducts);

router.post("/add", addProduct);

router.get("/edit/:productId", getEditProductPage);

router.post("/edit", postEditProductPage);

router.post("/delete", postDeleteProductPage);

module.exports = router;