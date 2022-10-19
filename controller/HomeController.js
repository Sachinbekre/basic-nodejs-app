const { getAllProducts, getProductById } = require("../models/Product");

exports.getHomePage = (req, res) => {
  getAllProducts((products) => {
    let viewData = {
      admin:false,
      products: products,
    };
    res.render("product-list", viewData);
  });
};

exports.getProductDetails = (req, res) => {
  let productId = req.params.productId;
  getProductById(productId,product =>{
    let viewData = {
      product:product
    }
    res.render("productDetails", viewData);
  });
  
};
