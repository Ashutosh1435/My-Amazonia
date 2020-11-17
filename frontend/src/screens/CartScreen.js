import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from "../actions/cartActions"
import { useDispatch, useSelector } from 'react-redux'
import MessageBox from '../components/MessageBox'
import { Link } from 'react-router-dom';


function CartScreen(props) {
    const productId = props.match.params.id;
    // Optional parameter are used by -> props.location.search
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        // Whenever variable is used in useEffect, it is defined in dependenc list. []
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        // delete action
        dispatch(removeFromCart(id));
    };

    const checkOutHandler = () => {
        // redirect to sign in screen.
        props.history.push(`/signin?redirect=shipping`)

    }
    return (
        <div className="row top">
            <div className="col-2">
                {cartItems.length === 0 ?
                    <MessageBox>Cart is empty<Link to="/"> Dashboard</Link>
                    </MessageBox> :
                    (
                        <ul>
                            {
                                cartItems.map((item) => (
                                    <li key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img src={item.image} className="small" alt={item.name}></img>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <select value={item.qty}
                                                    /* this is the qty changed. */
                                                    onChange={(event) => dispatch(addToCart(item.product,
                                                        Number(event.target.value)))}>
                                                    {
                                                        [...Array(item.countInStock).keys()].map(x =>
                                                            (<option key={x + 1} value={x + 1}>{x + 1}</option>)
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div>Rs {item.price}</div>
                                            <div>
                                                <button type="button" onClick={() => removeFromCartHandler(item.product)}>Delete</button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a, current) => a + current.qty, 0)} items : Rs {
                                    cartItems.reduce((a, current) => a + current.price * current.qty, 0)
                                })
                            </h2>
                        </li>
                        <li>
                            <button
                                type='button'
                                onClick={checkOutHandler}
                                className="primary block"
                                disabled={cartItems.length === 0}>
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CartScreen;