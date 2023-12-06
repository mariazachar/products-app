const mongoose = require('mongoose');
const Products = require('../models/product.model');


exports.findAll = async(req, res) => {
    console.log("Find all products");

    try {
        const result = await Products.find({}); 
        res.status(200).json({status:true, data: result});
        console.log("Success in reading all users")
        // logger.info("log Info succes in reading all users")
        // logger.error(">>> Problem in reading all users")
        // logger.log("logger succes in reading all users")
    } catch(err) {
        res.status(400).json({status:false, data: err})
        // logger.error("Problem in reading all users")
        console.log("Problem in reading all users")
    }
   
}

exports.findOne = async(req, res) => {
    const id = req.params._id;
    console.log("Find one product");

    try {
        const result = await Products.find({_id:id});
        res.status(200).json({status:true, data: result});
        console.log("Finding product with id: ", id)
    } catch(err) {
        res.status(400).json({status:false, data: err})
        console.log("Problem in finding product with id: ", id)
    }
   
}

exports.create = async(req, res) => {
    const newProduct = new Products({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    })
    console.log("Create a new product");

    try {
        const result = await newProduct.save({});
        res.status(200).json({status:true, data: result});
        console.log("Success in inserting a new product.")
    } catch(err) {
        res.status(400).json({status:false, data: err})
        console.log("Problem in inserting a new product.")
    }
   
}

exports.update = async(req, res) => {
    const id = req.params._id;
    console.log("Update product with id", id);
    const updateProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }
    

    try {
        const result = await Products.findOneAndUpdate({_id: id}, updateProduct);
        res.status(200).json({status:true, data: result});
        console.log("Success in updating product with id", id)
    } catch(err) {
        res.status(400).json({status:false, data: err})
        console.log("Problem in updating product with id", id)
    }
   
}

exports.delete = async(req, res) => {
    const id = req.params._id;
    console.log("Delete product with id", id);

    try {
        const result = await Products.findOneAndDelete({_id: id});
        res.status(200).json({status:true, data: result});
        console.log("Success in deleting product with id", id)
    } catch(err) {
        res.status(400).json({status:false, data: err})
        console.log("Problem in deleting product with id", id)
    }
   
}