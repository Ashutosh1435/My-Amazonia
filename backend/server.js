import mongoose from 'mongoose';
import express from 'express';
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js';
import config from './config.js';
import orderRouter from './routers/orderRouter.js';
import url from "url";
import Order from '../backend/models/orderModel.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';

const app = express();
// these are two middlewares used for converting all http requests like body content into
// into req.body in your node aplication
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const URL = config.localUrl;
mongoose.connect(URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
)
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/callback', async (req, res) => {
    const url_parts = url.parse(req.url, true);
    const responseData = url_parts.query;
    const orderId = responseData.order_id;
    if (responseData.payment_status == 'Credit') {
        const order = await Order.findById(orderId);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                payment_id: responseData.payment_id,
                buyer_name: req.body.buyer_name,
                update_time: Date.now(),
                email_address: req.body.email_address,
            };
            order.save();
            return res.redirect(`https://my-amazonia.herokuapp.com/order/${orderId}`);
        }
    } else {
        console.log("Payment Failed");
        return res.redirect(`https://my-amazonia.herokuapp.com/order/${orderId}`)
    }
})

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'))
);
// app.get('/', (req, res) => {
//     res.send("Server is ready");
// })
//  this middleware is a error catcher
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})

// Hard coded port no. is not recomended at all. port using Environment-Variable.

app.listen(config.port, () => {
    console.log(`Serve at http://localhost:${config.port}`);
});






