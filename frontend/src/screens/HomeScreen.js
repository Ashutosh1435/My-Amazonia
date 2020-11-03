import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';


function HomeScreen(props) {
    const dispatch = useDispatch();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const category = props.match.params.id ? props.match.params.id : '';
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts(category, searchKeyword, sortOrder));
    }, [dispatch, category, sortOrder])

    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        dispatch(listProducts(category, searchKeyword, sortOrder));

    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listProducts(category, searchKeyword, sortOrder));
    }
    return (
        <div className="content">
            {category && <h2>{category}</h2>}
            <ul className="filter">
                <li>
                    <form onSubmit={submitHandler}>
                        <input name="searchKeyword" placeholder="Search Product" onChange={(e) => setSearchKeyword(e.target.value)}></input>
                        <button type="submit" className="search">Search</button>
                    </form>
                </li>
                <li>
                    Sort By{' '}
                    <select name="sortOrder" onChange={sortHandler}>
                        <option value="">Newest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>

                    </select>
                </li>
            </ul>
            {loading ? <LoadingBox></LoadingBox>
                :
                //  It can be access by using props.children
                error ? <MessageBox variant='danger'>{error}</MessageBox>
                    : <div className="row center">
                        {
                            products.map(product => (
                                <Product key={product._id} product={product} />
                            ))
                        }

                    </div>
            }
        </div>

    );
}

export default HomeScreen;