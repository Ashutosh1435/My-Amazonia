// import { load } from 'dotenv/types';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer, orderDeleteReducer, orderDeliverReducer } from './reducers/orderReducers';
import { productListReducer, productDetailsReducer, productCreateReducer, productUpdateReducer, productDeleteReducer, productReviewReducer, } from './reducers/productReducers'
import { userdetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducer';

// const initialState = { };
const initialState = {
    // userRegister: {
    //     userInfo: localStorage.getItem('userInfo') ?
    //         JSON.parse(localStorage.getItem("userInfo"))
    //         : null
    // },
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ?
            JSON.parse(localStorage.getItem("userInfo"))
            : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ?
            JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ?
            JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'Paypal',
    }
};
const reducer = combineReducers({
    //  Combining all reducers of my app. to store data in store.
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    UserRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    // orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userdetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    productReview: productReviewReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;