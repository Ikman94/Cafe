const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const data = require('../../data');
const Product = require('../models/productModel');
const isAuth = require('../../utils');
const isAdmin = require('../../utils');


let routes = (app) => {
    app.get('/products', expressAsyncHandler(async (req, res) => {
        let products = await Product.find({});
        
        products = JSON.parse(JSON.stringify(products))
        let data = { title: "Products", products }
        // res.render("pages/products", data)
        res.send(products);
    }));

    app.get('/products/seed', expressAsyncHandler(async (req, res) => {
        // await Product.remove({})
        let = createdProducts = await Product.insertMany(data.products);
        res.send(createdProducts)
    }));

    app.get('/products/:id', expressAsyncHandler(async (req, res) => {
        let product = await Product.findById(req.params.id);
        if (product) {
            res.send(product)
        } else {
            res.status(404).send({ message: 'Product not Found' });
        }
    }));

    app.post('/products', isAuth, isAdmin, expressAsyncHandler(async (req, res)=>{
        let product = new Product(req.body);

        await product.save((err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while creating the Order."
                })
            }
            console.log(req.body.date)
            res.redirect('/products')
        });
    }));

}

module.exports = routes