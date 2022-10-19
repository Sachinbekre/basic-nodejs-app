const {
  saveProducts,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../../models/Product");

exports.getProducts = (req, res) => {
  let viewData = {
    edit: false,
    page: "Add Product Page",
    productName: "Add Product",
  };
  res.render("addProduct", viewData);
};

exports.addProduct = (req, res) => {
  const product = {
    id: Date.now(),
    productName: req.body.productName,
    imageUrl: req.body.imageUrl,
    price: parseFloat(req.body.price),
    description: req.body.description,
  };
  saveProducts(product);
  res.redirect("/");
};

exports.getAdminProductPage = (req, res) => {
  getAllProducts((products) => {
    let viewData = {
      admin: true,
      products: products,
    };
    res.render("product-list", viewData);
  });
};

exports.getEditProductPage = (req, res) => {
  const productId = req.params.productId;
  getProductById(productId, (products) => {
    let viewData = {
      edit: true,
      page: "Edit Page",
      products: products,
    };
    res.render("addProduct", viewData);
  });
};

exports.postEditProductPage = (req, res) => {
  let product = {
    id: req.body.id,
    productName: req.body.productName,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
  };
  updateProductById(product, req.body.id);
  res.redirect("/products");
};


exports.postDeleteProductPage = (req, res) => {
  const productId = req.body.productId;
  deleteProductById(productId, () => {
    res.redirect('/products');
  });
};