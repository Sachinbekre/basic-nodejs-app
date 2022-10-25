const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");

exports.getHomePage = (req, res) => {
  Product.findAll({include:[{model:Category},{model:User}]})
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
      let viewData = {
        product: product,
      };
      res.render("productDetails", viewData);
    })
    .catch((error) => {
      console.log(error);
    });
};
