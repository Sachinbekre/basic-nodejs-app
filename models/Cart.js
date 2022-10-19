const fs = require('fs');
const path = require('path');
const rooDir = require('../utils/path');


exports.getCartDetailsFromFile = (callback) =>{
    const cartPath =    path.join(rooDir, 'data','cart.json');
    fs.readFile(cartPath,(error,cartContent) => {
        let cart = { products:[]};
        if (!error) {
            cart = JSON.parse(cartContent);
        }
        return callback(cart)
    })
}


exports.addToCart = (pId,productPrice) =>{
    const cartPath =    path.join(rooDir, 'data','cart.json');
    this.getCartDetailsFromFile((cart) =>{
        
        let existingProductIndex = cart.products.findIndex((prod) => prod.id.toString() === pId);
        let updateProduct;
        if (existingProductIndex !== -1) {
            updateProduct =  { ...cart.products[existingProductIndex] };
            updateProduct.quantity += 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updateProduct;
        }else{
            updateProduct = { id:pId, quantity: 1};
            cart.products = [...cart.products, updateProduct];
        }
        fs.writeFile(cartPath,JSON.stringify(cart),(error) => {
            console.log(error);
        });
    });
  
}


exports.deleteProductFromCart = (productId,callback = '') => {
    const cartPath = path.join(rooDir, 'data','cart.json');
    this.getCartDetailsFromFile((cart) =>{
        debugger
        let cartProducts = cart.products;
        console.log("cart call",cart);
        console.log("productId call",productId);
        // let updatedCartProducts = cartProducts.filter((prod) => prod.id.toString() !== productId.toString());
        let updatedCartProducts = cartProducts.filter((prod) => parseInt(prod.id) !== parseInt(productId));
        // cart.products = [...updatedCartProducts]
        // console.log("delete call",updatedCartProducts1);
        fs.writeFile(cartPath,JSON.stringify({products:updatedCartProducts}),(error) => {
            console.log(error);
        });
        if (callback) {
            callback();
        }
    });
}