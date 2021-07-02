var express = require('express');
var router = express.Router();

/////////// --- Khai báo các xử lý trong 1 Controller
router.get("/", getHome);

function getHome(req, res) {
    let funcList = ["View product","Create new product","Modify product","Delete product", "View order", "View Report", "..."];
    res.render("home", { func: funcList, title: "Home Page" });
    //res.sendFile(__dirname + "/view/home.html");
}
/// --- EXports
module.exports = router;