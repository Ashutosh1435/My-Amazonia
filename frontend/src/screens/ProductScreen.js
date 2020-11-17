import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
// import data from "../data"
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';


function ProductScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const productSaveReview = useSelector(state => state.productReview);
    const { success: productSaveSuccess } = productSaveReview;

    useEffect(() => {
        if (productSaveSuccess) {
            alert("Review Submitted Successfully.");
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_SAVE_RESET })
        }
        dispatch(detailsProduct(productId));
    }, [dispatch, productId, productSaveSuccess])

    const addToCartHandler = () => {
        // Used to change the path in react application
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProductReview(productId, {
            name: userInfo.name,
            rating: rating,
            comment: comment
        }))
    }
    return (

        <div>
            {loading ? <LoadingBox></LoadingBox>
                :
                //  It can be access by using props.children
                error ? <MessageBox variant='danger'>{error}</MessageBox>
                    :
                    <div>
                        <Link to="/">Back to result</Link>
                        {/* <h5>{product.name}</h5> */}
                        <>
                            <div className="row top">
                                <div className="col-2">
                                    <img className="large" src={product.image} alt={product.name}></img>
                                </div>
                                <div className="col-1">
                                    <ul>
                                        <li><h1>{product.name}</h1></li>
                                        <li><a href="#reviews"><Rating rating={product.rating} numReviews={product.numReviews} /></a></li>
                                        <li>Price : {product.price}</li>
                                        <li>Description : <p>{product.description}</p></li>
                                    </ul>
                                </div>
                                <div className="col-1">
                                    <div className="card card-body">
                                        <ul>
                                            <li>
                                                <div className="row">
                                                    <div>Price </div>
                                                    <div className="price">{product.price}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div>status</div>
                                                    <div >{product.countInStock > 0 ?
                                                        <span className="success"> In Stock</span>
                                                        : <span className="danger">Unavailable</span>
                                                    }</div>
                                                </div>
                                            </li>
                                            {
                                                product.countInStock > 0 && (
                                                    <>
                                                        <li>
                                                            <div className="row">
                                                                <div>Qty</div>
                                                                <div>
                                                                    <select value={qty} onChange={e => setQty(e.target.value)}>
                                                                        {
                                                                            [...Array(product.countInStock).keys()].map(x =>
                                                                                (<option key={x + 1} value={x + 1}>{x + 1}</option>)
                                                                            )
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <button onClick={addToCartHandler} className="primary block">Add To Cart</button>
                                                        </li>
                                                    </>

                                                )
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="content-margined">
                                <h2>Reviews</h2>
                                {!product.reviews.length && <div>There is no any reviews.</div>}
                                <ul className="reviews" id="reviews">
                                    {
                                        product.reviews.map(review => (
                                            <li key={review._id}>
                                                <div>
                                                    <b>{review.name}</b>
                                                </div>
                                                <div>
                                                    <Rating rating={review.rating}></Rating>
                                                </div>
                                                <div>
                                                    {review.createdAt ? review.createdAt.substring(0, 10) : null}
                                                </div>
                                                <div>{review.comment}</div>
                                            </li>
                                        ))
                                    }
                                    <li>
                                        <h3>Write a customer review.</h3>
                                        {userInfo ? <form onSubmit={submitHandler}>
                                            <ul className="form-container">
                                                <li>
                                                    <label htmlFor="rating">Rating</label>
                                                    <select name="rating" id="rating" value={rating}
                                                        onChange={(e) => setRating(e.target.value)}>
                                                        <option name="rating" value="1">1-Poor</option>
                                                        <option name="rating" value="2">2-Average</option>
                                                        <option name="rating" value="3">3-Good</option>
                                                        <option name="rating" value="4">4-Very Good</option>
                                                        <option name="rating" value="5">5-Excellent</option>
                                                    </select>
                                                </li>
                                                <li>
                                                    <label htmlFor="comment">Comment</label>
                                                    <textarea name="comment" onChange={(e) => setComment(e.target.value)}></textarea>
                                                </li>
                                                <li>
                                                    <button type="submit" className="primary">Submit</button>
                                                </li>
                                            </ul>
                                        </form> : <div> Please <Link to="/signin">Sign In</Link> to write a review.</div>}
                                    </li>
                                </ul>
                            </div>
                        </>
                    </div>
            }

        </div>
    );

}

export default ProductScreen;