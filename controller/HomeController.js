const { getAllProducts, getProductById } = require("../models/Product");
const Product = require("../models/ProductModel");

exports.getHomePage = (req, res) => {
  Product.findAll()
    .then((products) => {
      let viewData = {
        admin: false,
        products: products,
      };
      res.render("product-list", viewData);
    })
    .catch((error) => {});
};

exports.getProductDetails = (req, res) => {
  let productId = req.params.productId;
  Product.findByPk(productId)
    .then((product) => {
      console.log('productDetails',product);
      let viewData = {
        product: product,
      };
      res.render("productDetails", viewData);
    })
    .catch((error) => {
      console.log(error);
    });
};
