const express = require("express");

const path = require('path');

const bodyParser = require("body-parser");

const homeRouter = require("./routers/Home");

const adminRouter = require("./routers/Admin");

const rootDir = require('./utils/path');
const db = require("./utils/mydatabase");



const app = express();

app.set('view engine','ejs');

app.set('views','views');



db.execute(`select * from product`).then(data =>{
  console.log(data);
}).catch(error =>{
  console.log(error);
})

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

app.listen(3001, () => {
  console.log("server connected at port 3001");
});
