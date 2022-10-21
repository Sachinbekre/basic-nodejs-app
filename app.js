const express = require("express");

const path = require('path');

const bodyParser = require("body-parser");

const homeRouter = require("./routers/Home");

const adminRouter = require("./routers/Admin");

const rootDir = require('./utils/path');
const sequelize = require("./utils/mydatabase");
const Product = require("./models/ProductModel");



const app = express();

app.set('view engine','ejs');

app.set('views','views');


app.use(express.static(path.join(rootDir,'public')));

app.use('/css', express.static(path.join(rootDir,'node_modules','bootstrap','dist','css')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/products", adminRouter);

app.use(homeRouter);

app.get('/public/css/home.css',(req,res) =>{
    res.sendFile(path.join(rootDir,'public','css', 'home.css'))
})

app.use((req, res, next) => {
  let Obj = {
    title:'Page Not Found Please try again'
  }
  res.status(404).render('pageNotFound',Obj)
});

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
