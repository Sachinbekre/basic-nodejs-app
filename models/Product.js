const fs = require('fs');
const path = require('path');
const rootDir = require("../utils/path");
const { deleteProductFromCart } = require('./Cart');
const db = require('../utils/mydatabase')

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
  console.log('save product',product);
  return db.execute(`INSERT INTO product (name, description, imageUrl, price) VALUES (?, ?, ?, ?)`,[
    product.name,
    product.description,
    product.imageUrl,
    product.price,
  ]);


  const productsPath = path.join(rootDir, "data", "products.json");

  getProductsFromFile ((productsData) =>{
    productsData.push(product);
    fs.writeFile(productsPath, JSON.stringify(productsData), (error) => {
        console.log(error);
      });
  });
};

exports.getAllProducts = () => {
  // getProductsFromFile(callback);
  // return db.execute(`select * from product`);
};

exports.getProductById = (productId) =>{
  return db.execute(`select * from product where id = ?`, [productId]);
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
