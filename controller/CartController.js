const {
  addToCart,
  getCartDetailsFromFile,
  deleteProductFromCart,
} = require("../models/Cart");
const { getProductById, getAllProducts } = require("../models/Product");
const Product = require("../models/ProductModel");

exports.postCartPage = (req, res) => {
  const productId = req.body.productId;
  let newQuantity = 1;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      if (!cart) {
        return req.user.createCart();
      }
      return cart;
    })
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      if (products.length) {
        newQuantity = products[0].cartItem.quantity + 1;
        return products[0];
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getCartPage = (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      if(cart){
        return cart.getProducts();
      }else{
        return null;
      }
      
    })
    .then((cartProducts) => {
      let totalPrice = 0;
      if(cartProducts){
        for (let product of cartProducts) {
          totalPrice += +product.cartItem.quantity * +product.price;
        }
      }
      const viewData = {
        cartProducts: cartProducts,
        totalPrice: totalPrice,
      };
      res.render("cartDetails", viewData);
    });
};

exports.deleteCartItem = (req, res) => {
  const productId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return Product.findByPk(productId);
      // return cart.getProducts({ where: { id: productId } });
    })
    .then((product) => {
      return fetchedCart.removeProduct(product)
      // return products[0].cartItem.destroy();
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((error) => {
      console.log(error);
    });
};
