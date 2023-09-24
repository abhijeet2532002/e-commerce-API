const Product = require("../models/Product");

// get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(201).json({ data: products });
    } catch (err) {
        res.status(501).json(err);
    }
};

// get product by id
const getProductById = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        res.status(201).json({ data: products });
    } catch (err) {
        res.status(501).json(err);
    }
};

// create new product
const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({ data: newProduct });
    } catch (err) {
        res.status(500).json(err);
    }

};

// update product's quantity
const updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({id: productId });
        if(!product) {
            res.status(404).json({
                message: "product not found"
            });
            return;
        }
        let newQuantity = req.body.quantity;

        if (newQuantity >= 0) {
            const updatedProduct = await Product.findOneAndUpdate(
                {
                    _id: productId
                },
                {
                    quantity: newQuantity
                },
                {
                    new: true,
                    runValidators: true
                }
            );
            res.status(200).json({ data: { updatedProduct, message: "Successfully updated" } });
        }
        else {
            res.status(400).json(
                {
                    data:
                        { message: "Total Quantity cannot be less than zero" }
                });
            return;
        }
    } catch (err) {
        res.status(500).json({ data: { message: "Error in updateing product" } });
    }

};

// delete product by id
const deleteProductById = async (req, res) => {
    try {
        await Product.remove({ "_id": req.params.id });
        res.status(200).json({ data: { message: "product deleted" } });
    } catch (error) {
        res.status(400).json({ data: { message: "No product is found with the id" } });
    }

};


module.exports = { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById };