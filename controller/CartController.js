const {
  addToCart,
  getCartDetailsFromFile,
  deleteProductFromCart,
} = require("../models/Cart");
const { getProductById, getAllProducts } = require("../models/Product");

exports.postCartPage = (req, res) => {
  const pid = req.body.productId;
  getProductById(pid, (product) => {
    addToCart(pid, product.price);
    res.redirect("/");
  });
};

exports.getCartPage = (req, res) => {
  getCartDetailsFromFile((cart) => {
    const cartProducts = cart.products;
    getAllProducts((products) => {
      const productsData = [];
      let totalPrice = 0;
      for (let cartItem of cartProducts) {
        let singleProduct = products.find(
          (prod) => prod.id.toString() === cartItem.id.toString()
        );
        let cartProductsPrice = +cartItem.quantity * +singleProduct.price;
        totalPrice += cartProductsPrice;
        productsData.push({
          ...singleProduct,
          quantity: cartItem.quantity,
          cartPrice: cartProductsPrice,
        });
      }
      const viewData = {
        cartProducts: productsData,
        totalPrice: totalPrice,
      };
      res.render("cartDetails", viewData);
    });
  });
};

exports.deleteCartItem = (req, res) => {
  const productId = req.body.productId;
  console.log("check", req.body);
  deleteProductFromCart(productId, () => {
    res.redirect("/cart");
  });
};
