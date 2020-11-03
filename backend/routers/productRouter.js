import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import data from '../data.js';
import { isAuth, isAdmin } from '../utils.js';


const productRouter = express.Router();

productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const category = req.query.category === 'All' ? {} : req.query.category ? { category: req.query.category } : {};
        const searchKeyword = req.query.searchKeyword ? {
            name: {
                $regex: req.query.searchKeyword.charAt(0).toUpperCase() + req.query.searchKeyword.slice(1).toLowerCase()

            }
        } : {};
        const sortOrder = req.query.sortOrder ?
            (req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 })
            : { _id: -1 }
        const products = await Product.find({ ...category, ...searchKeyword }).sort(sortOrder);
        if (products.length >= 1) {
            res.status(201).send(products);
        } else if (products.length === 0) {
            res.status(404).send({ message: "Alert : No such product found" });
        }

    }))

productRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        const createdProducts = await Product.insertMany(data.products);
        res.send({ createdProducts });
    }))

productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send(product);
        }
        else {
            res.send(404).send({ message: "Product not found" });
        }
    }))
productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Name' + Date.now(),
        image: '/images/p3.jpg',
        price: 0,
        category: 'Sample Category',
        brand: 'Sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'Sample description'
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
}))

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.brand = req.body.brand;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: "Product Updated", product: updatedProduct });
    } else {
        res.status().send({ message: "Product not found" })
    }
}))

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const deletedProduct = await product.remove();
        res.send({ message: "Product Deleted !", product: deletedProduct });
    } else {
        res.status(404).send({ message: "Product not found." });
    }
}))

productRouter.post('/:id/reviews', isAuth, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const review = {
            name: req.body.name,
            rating: Number(req.body.rating),
            comment: req.body.comment
        }
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
        const updatedProduct = await product.save();
        res.status(201).send({
            data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            message: "Review save Successfully."
        })
    } else {
        res, status(404).send({ message: "Product doesn't exists" })
    }
}))

export default productRouter;