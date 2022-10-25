const express = require("express");
const Category = require("../../models/CategoryModel");
const User = require("../../models/UserModel");

const router = express.Router();

exports.getCategoryPage = (req, res) => {
  Category.findAll({include:User})
    .then((categories) => {
      const viewData = {
        title: "Add Category",
        admin: false,
        categories: categories,
      };
      res.render("categories", viewData);
    })
    .catch((error) => {});
};

exports.getAddCategoryPage = (req, res) => {
  const viewData = {
    title: "Add Category",
    admin: false,
  };
  res.render("addCategories", viewData);
};

exports.postCategoryPage = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  req.user.createCategory({ name, description })
    .then(() => {
      res.redirect("/categories");
    })
    .catch((error) => {
      console.log("error getting", error);
    });
};
