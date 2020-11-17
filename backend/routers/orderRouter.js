import { createRequire } from 'module';
const require = createRequire(import.meta.url)
const Insta = require('instamojo-nodejs')
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../utils.js';
import config from '../config.js'


const orderRouter = express.Router();

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    // it's like join in sql
    const orders = await Order.find({}).populate('user', 'name');
    res.send(orders);
}));

orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id });

        if (orders) {
            res.send(orders);
        } else {
            res.status(501).send({ message: "Something Wrong" });
        }
    })
);

orderRouter.post('/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems.length === 0) {
            // 400 are client errors, where as all 500 are the server errors.
            // 200 for get requests 201 for post requests. 
            res.status(400).send({ message: 'Cart is empty' });
        } else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                //  Coming from middle-ware.
                user: req.user._id,
            })
            const createdOrder = await order.save();
            res.status(201)
                .send({ message: 'New Order Created', order: createdOrder });
        }
    }))

orderRouter.get('/:id', isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: "Order not found !" });
        }
    }))

orderRouter.post('/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            Insta.setKeys(config.instamojoSandboxKey, config.instamojoSandboxToken);
            const data = new Insta.PaymentData();
            Insta.isSandboxMode(true);

            data.purpose = req.body.purpose;
            data.amount = req.body.amount;
            data.buyer_name = req.body.buyer_name;
            data.email = req.body.email_address;
            data.phone = req.body.phone;
            data.redirect_url = req.body.redirect_url;
            data.order_id = req.body.order_id;
            data.send_email = false;
            data.send_sms = false;
            data.webhook = 'http://www.example.com/webhook/'
            data.allow_repeated_payments = false;

            Insta.createPayment(data, function (error, response) {
                if (error) {
                    console.log(error);
                    res.status(400).send({ message: error });
                } else {
                    const responseData = JSON.parse(response);
                    const redirectUrl = responseData.payment_request.longurl;
                    res.status(201).json({ url: redirectUrl });
                }
            })
        } else {
            res.status(404).send("Order not found.");
        }
    }))

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        const deletedOrder = await order.remove();
        res.send({ message: "Order deleted !", order: deletedOrder })
    } else {
        res.send({ message: "Order not exist !" });
    }
}))
orderRouter.put('/:id/deliver', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.send({ message: 'Order Delivered !', order: updatedOrder });
    } else {
        res.status(404).send({ message: "Order Not Found !" });
    }
}))
export default orderRouter;