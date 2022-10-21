const {
  saveProducts,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../../models/Product");
const Product = require("../../models/ProductModel");

exports.getProducts = (req, res) => {
  let viewData = {
    edit: false,
    page: "Add Product Page",
    name: "Add Product",
  };
  res.render("addProduct", viewData);
};

exports.addProduct = (req, res) => {
  const product = {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: parseFloat(req.body.price),
    description: req.body.description,
  };
  const productObj = Product.build(product);
  productObj
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((error) => {});
};

exports.getAdminProductPage = (req, res) => {
  Product.findAll()
    .then((products) => {
      console.log("Admin products", products);
      let viewData = {
        admin: true,
        products: products,
      };
      res.render("product-list", viewData);
    })
    .catch((error) => {});
};

exports.getEditProductPage = (req, res) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then((product) => {
      let viewData = {
        edit: true,
        page: "Edit Page",
        products: product,
      };
      res.render("addProduct", viewData);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postEditProductPage = (req, res) => {
  const productId = req.body.id;
  // let product = {
  //   id: req.body.id,
  //   name: req.body.name,
  //   imageUrl: req.body.imageUrl,
  //   price: req.body.price,
  //   description: req.body.description,
  // };

  Product.findByPk(productId)
    .then((product) => {
      product.name = req.body.name;
      product.imageUrl = req.body.imageUrl;
      product.description = req.body.description;
      product.price = req.body.price;
      return product.save();
    })
    .then(() => {
      res.redirect("/products");
    })
    .catch((error) => {
      console.log(error);
    });

  // Product.update(product,{where:{id:productId}}).then(() =>{
  //   res.redirect("/products");
  // }).catch(error =>{
  //   console.log(error);
  // });
};

exports.postDeleteProductPage = (req, res) => {
  const productId = req.body.productId;
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      res.redirect("/products");
    })
    .catch((error) => {
      console.log(error);
    });

  // Product.destroy({ where: { id: productId } })
  //   .then(() => {
  //     res.redirect("/products");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};
