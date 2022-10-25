const express = require("express");

const path = require("path");

const bodyParser = require("body-parser");

const homeRouter = require("./routers/Home");

const adminRouter = require("./routers/Admin");

const categoryRouter = require("./routers/Category");

const rootDir = require("./utils/path");
const sequelize = require("./utils/mydatabase");
const Category = require("./models/CategoryModel");
const Product = require("./models/ProductModel");
const User = require("./models/UserModel");
const Cart = require("./models/CartModel");
const CartItem = require("./models/CartItemModel");
const Order = require("./models/OrderModel");
const OrderItem = require("./models/OrderItem");

const app = express();

app.set("view engine", "ejs");

app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));

app.use(
  "/css",
  express.static(path.join(rootDir, "node_modules", "bootstrap", "dist", "css"))
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next) => {
  User.findByPk(1).then((user) =>{
    req.user = user;
    next();
  })
})

app.use("/products", adminRouter);

app.use("/categories", categoryRouter);

app.use(homeRouter);

app.get("/public/css/home.css", (req, res) => {
  res.sendFile(path.join(rootDir, "public", "css", "home.css"));
});

app.use((req, res, next) => {
  let Obj = {
    title: "Page Not Found Please try again",
  };
  res.status(404).render("pageNotFound", Obj);
});

Category.belongsTo(User);
Category.hasMany(Product);

Product.belongsTo(User);
Product.belongsTo(Category);
Product.belongsToMany(Cart,{through:CartItem});
Product.belongsToMany(Order,{through:OrderItem});

User.hasMany(Product);
User.hasMany(Category);
User.hasOne(Cart);
User.hasMany(Order);

Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});

Order.belongsTo(User);
Order.belongsToMany(Product,{through:OrderItem});


sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      User.create({
        name: "Sachin Suresh Dev",
        email: "sachinbsbekre@gmail.com",
      });
    }
  })
  .catch((error) => {});

// sequelize.authenticate().then(() =>{
//   console.log('connection established successfully');
// }).catch(error =>{
//   console.log("error in connection");
// })

// Product.sync().then(result => {
//   console.log("res",result);
// });

// const sampleProduct = {
//   name:'sample',
//   description:'sample description',
//   imageUrl:'adasdsadasdasd',
//   price:12.12
// };

app.listen(3001, () => {
  console.log("server connected at port 3001");
});
