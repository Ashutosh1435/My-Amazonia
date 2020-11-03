import mongoose from 'mongoose';
import User from '../models/userModel.js'

const orderSchema = new mongoose.Schema({

    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                // Reference
                ref: "Product",
                required: true,
            },
        },
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        phone: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
        payment_id: String,
        buyer_name: String,
        update_time: String,
        email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    //  inform about user, who order this item.
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'AmazonaUser', required: true },
    // fields for status of order.
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date, },
},
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;