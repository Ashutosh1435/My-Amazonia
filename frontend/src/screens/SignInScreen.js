import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// named exorts should be rapped in the curly bracket.
function SignInScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const submitHandler = (e) => {
        e.preventDefault();
        // sign in action
        dispatch(signin(email, password));
    }
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo])
    return (
        <div>
            <form onSubmit={submitHandler} className="form">
                <div>
                    <h1 className="center">Sign In</h1>
                </div>
                {loading && <LoadingBox />}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email"
                        placeholder="Enter email" required
                        onChange={e => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"
                        placeholder="Enter password" required
                        onChange={e => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label ></label>
                    <button type="submit" className="primary">Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        New Customer?{' '}
                        <Link to={`/register?redirect=${redirect}`}>Create your Account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignInScreen;