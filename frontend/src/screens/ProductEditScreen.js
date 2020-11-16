import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

function ProductEditScreen(props) {

    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            props.history.push(`/productlist`);
        }
        if (!product || product._id !== productId || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setCategory(product.category);
            setBrand(product.brand);
            setImage(product.image);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }

    }, [product, dispatch, productId, props.history, successUpdate])
    //  If there is change in any of three variables useEffect hook will run again.
    const submitHandler = (e) => {
        e.preventDefault();
        // Dispatch Update Product.
        dispatch(updateProduct(
            {
                _id: product._id,
                name,
                price,
                category,
                brand,
                image,
                countInStock,
                description
            }
        ))
    }
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads/s3', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })
            // const arr = data.split('uploads');
            // const path = arr[1];
            // setImage(`/uploads/sharp/${path}`);
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div><h1 className="center">Edit Product {productId}</h1></div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading ? <LoadingBox></LoadingBox> :
                    error ? <MessageBox variant="danger">{error}</MessageBox> :
                        <>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" value={name} placeholder="Enter name"
                                    onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input type="text" id="price" value={price} placeholder="Enter price"
                                    onChange={(e) => setPrice(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="category">Category</label>
                                <input type="text" id="category" value={category} placeholder="Enter category"
                                    onChange={(e) => setCategory(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="image">Image</label>
                                <input type="text" id="image" value={image} placeholder="Enter image"
                                    onChange={(e) => setImage(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="imageFIle">Image File</label>
                                {/* accept helps in taking only */}
                                <input type="file" id="imageFIle" accept=".jpg, .jpeg, .png"
                                    label="Chooose Image" onChange={uploadFileHandler}></input>
                                {loadingUpload && <LoadingBox></LoadingBox>}
                                {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                            </div>
                            <div>
                                <label htmlFor="countInStock">Count In Stock</label>
                                <input type="text" id="countInStock" value={countInStock} placeholder="Enter countInStock"
                                    onChange={(e) => setCountInStock(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="brand">Brand</label>
                                <input type="text" id="brand" value={brand} placeholder="Enter brand"
                                    onChange={(e) => setBrand(e.target.value)}></input>
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea type="text" id="description" value={description} placeholder="Enter description"
                                    rows="3" onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <div>
                                <label />
                                <button type="submit" className="primary">Update</button>
                            </div>
                        </>
                }
            </form>
        </div>
    );
}

export default ProductEditScreen;