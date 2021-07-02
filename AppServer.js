//-----------------------------------
// LOAD thư viện cần chạy
//-----------------------------------
const express = require("express");
const expressSession = require("express-session");
const path = require("path");
//const bodyParser = require("body-parser");
var hbs = require('hbs');

//--------- Connect DB (MongoDB, FireBase, ...)
const mongoose = require("mongoose");
const dbConnect = require("./libs/dbconnect");
dbConnect.connectDB(dbConnect.xURL);

//--------- Server INITialization
const app = express();

//-----------------------------------
// Cấu hình thư viện + Data
//-----------------------------------
xPORT = process.env.PORT || 3000;


// Cấu hình MVC + Engine - View
app.set("views", path.join(__dirname, "view")); //setting views directory for views.
app.set("view engine", "hbs"); //setting view engine as handlebars

hbs.registerPartials(__dirname + '/view/partials');

// khai báo tới thư mục Static / Public
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.static(__dirname + '/public'));

//-----------------------------------
// ROUTING tới các chức năng
//-----------------------------------
const Router = express.Router();

// --------- filter Request
app.use(
    (req, res, next) => {
        console.log("\n\n----------------\n TIME: ", Date.now());
        console.log("\n URL: ", req.url);
        console.log("\n QUERY: ", req.query);
        next();
    }
);

// --------- ERROR Handle
app.use(
    (err, req, res, next) => {
        console.log("\n ERR: ", Date.now());
        res.status(500).send("WEB Broken !");
    }
);

// --------- Default
Router.get("/", getHome);

function getHome(req, res) {
    let funcList = ["View product","Create new product","Modify product","Delete product", "View order", "View Report", "..."];
    res.render("home", { func: funcList, title: "Home Page" });
    //res.sendFile(__dirname + "/view/home.html");
}

// --------- Home
const HomeController = require("./controllers/HomeController");
app.use("/home", HomeController);

// --------- Profile
const ProfileController = require("./controllers/ProfileController");
app.use("/profile", ProfileController);

// --------- Login
const LoginController = require("./controllers/LoginController");
app.use("/login", LoginController);


// --------- Product
const ProductController = require("./controllers/ProductController");
app.use("/product", ProductController);


// --------- Order
const OrderController = require("./controllers/OrderController");
app.use("/order", OrderController);



// --------- Payment
const PaymentController = require("./controllers/PaymentController");
app.use("/payment", PaymentController);


// --------- Report
const ReportController = require("./controllers/ReportController");
app.use("/report", ReportController);


// --------- Logout
const LogoutController = require("./controllers/LogoutController");
app.use("/logout", LogoutController);




//-----------------------------------
// Sử dụng Middleware (LIB) cho WEB
//-----------------------------------
app.use("/", Router);

//app.use(bodyParser.json());

app.use(expressSession({
    secret: "NNTu-Cloud",
    resave: true,
    saveUninitialized: true,
    maxAge: 3600000
}));

//-----------------------------------
// Mở WEB tại xPORT
//-----------------------------------
app.listen(xPORT);

console.log("\n WEB tại PORT: ", xPORT);