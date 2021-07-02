var express = require('express');
var router = express.Router();

/// DATA
const mongoose = require("mongoose");
const dbconnect = require('../libs/dbconnect');
const { replaceOne } = require('../models/Product');
const Product = require("../models/Product");


/////////// --- Khai báo các xử lý trong 1 Controller
router.get("/", getProduct);

async function getProduct(req, res) {
    var productlist = await Product.find({});
    console.log(productlist);
    res.render("product", { title: "Product Page", product: productlist });
}

/// - NEW --> Create
router.get("/new", getNewProduct);

function getNewProduct(req, res) {
    res.render("products/productnew", { title: "Create a New Product" });
}

/// - CRUD - C - Create / Post
router.post("/", createNewProduct);

async function createNewProduct(req, res) {
    console.log(req.params);
    res.end(JSON.stringify(req.body));
    var product1 = new Product(req.body)
    product1.save((err) => {
        console.log("\ERR ", err);
    });
    //res.render("productnew", { title: "Create a New Product" });
}


/// - reEDIT --> Update
router.get("/edit", getEditProduct);

async function getEditProduct(req, res) {
    var productlist = await Product.find({});
    console.log(productlist);
    res.render("products/manageproduct", { title: "Manage all Product" , product: productlist });
}

/// - CRUD - U - Update one product
router.get("/Updateform:Product_Code1", updateProduct(Product_Code1));

async function updateProduct(req , res) {
    console.log(req.params);
    var productcode1 = await Product.find();
    res.render("products/updateproduct", { title: "Update a Product" , product1: productcode1 });
}

/// - CRUD - C - Create / Post
router.put("/Update", createNewProduct);

async function createNewProduct(req, res) {
    console.log(req.params);
    res.end(JSON.stringify(req.body));
    var product1 = new Product(req.body)
    product1.update((err) => {
        console.log("\ERR ", err);
    });
    //res.render("productnew", { title: "Create a New Product" });
}
/// - CRUD - D - Delete 
router.delete("/Delete/:Product_Code", deleteProduct);

function deleteProduct(req, res) {
    res.render("product-delete", { title: "Update a Product" });
}


/// --- EXports
module.exports = router;