const fs = require('fs');
const path = require('path');
const rootDir = require("../utils/path");
const { deleteProductFromCart } = require('./Cart');

const getProductsFromFile = (callback) =>{
    const productsPath = path.join(rootDir, "data", "products.json");
    fs.readFile(productsPath, (error, productsData) => {
        if(error){
            return callback([]);
        }
        return callback(JSON.parse(productsData));
    });
}

exports.saveProducts = (product) => {
  const productsPath = path.join(rootDir, "data", "products.json");

  getProductsFromFile ((productsData) =>{
    productsData.push(product);
    fs.writeFile(productsPath, JSON.stringify(productsData), (error) => {
        console.log(error);
      });
  });
};

exports.getAllProducts = (callback) => {
  getProductsFromFile(callback);
};

exports.getProductById = (productId,callback) =>{
  getProductsFromFile(products =>{
    const product = products.find(p => p.id.toString() === productId);
    callback(product);
  });
}

exports.updateProductById = (product,id) =>{
  const productsPath = path.join(rootDir, "data", "products.json");
  getProductsFromFile(products =>{
    const existingProductIndex = products.findIndex(prod => prod.id.toString() === id );
    const updateProducts = [...products];
    updateProducts[existingProductIndex] = product;
    fs.writeFile(productsPath,JSON.stringify(updateProducts),error =>{
      console.log("error",error);
    });
  });
  
}

exports.deleteProductById = (productId,callback) =>{
  const productsPath = path.join(rootDir, "data", "products.json");
  getProductsFromFile(products =>{
    const updatedProduct = products.filter(prod => prod.id.toString() !== productId);
    deleteProductFromCart(productId);
    fs.writeFile(productsPath,JSON.stringify(updatedProduct),error =>{
      console.log("error",error);
    });
    callback();
  });
  
}
