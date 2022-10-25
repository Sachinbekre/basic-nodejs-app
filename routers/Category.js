const express = require("express");
const { getCategoryPage, postCategoryPage, getAddCategoryPage } = require("../controller/admin/CategoryController");
const router = express.Router();

router.get('/',getCategoryPage);

router.get("/add", getAddCategoryPage);

router.post("/add", postCategoryPage);

module.exports = router;