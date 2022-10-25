const Category = require("../../models/CategoryModel");
const {
  saveProducts,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../../models/Product");
const Product = require("../../models/ProductModel");
const User = require("../../models/UserModel");

exports.getProducts = (req, res) => {
  Category.findAll()
    .then((categories) => {
      let viewData = {
        edit: false,
        page: "Add Product Page",
        categories: categories,
      };
      res.render("addProduct", viewData);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.addProduct = (req, res) => {
  const categoryId = req.body.categoryId;
  const product = {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: parseFloat(req.body.price),
    description: req.body.description,
    categoryId: req.body.categoryId,
  };
  let categoryObj;
  Category.findByPk(categoryId)
    .then((category) => {
      categoryObj = category;
      return req.user.createProduct(product);
    })
    .then((productObj) => {
      return productObj.setCategory(categoryObj);
    })
    .then(() => {
      return res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getAdminProductPage = (req, res) => {
  Product.findAll({include:[{model:Category},{model:User}]})
    .then((products) => {
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
  let viewData = {
    edit: true,
    page: "Edit Page",
  };
  Product.findByPk(productId)
    .then((product) => {
      viewData.products  = product;
      return Category.findAll({ attributes: ["id", "name"] });
    })
    .then((categories) => {
      viewData.categories  = categories;
      res.render("addProduct", viewData);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postEditProductPage = (req, res) => {
  const productId = req.body.id;
  Product.findByPk(productId)
    .then((product) => {
      product.name = req.body.name;
      product.imageUrl = req.body.imageUrl;
      product.description = req.body.description;
      product.price = req.body.price;
      product.categoryId = req.body.categoryId
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
