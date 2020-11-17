import {
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGN_OUT,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_SUCCESS
} from "../constants/userConstants"
import axios from 'axios';
import Axios from "axios";
// Dispatch is a function present in the redux-thunk pakg.
export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post("/api/users/signin", { email, password })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                // To check if response exists AND message exists, 
                // then send given msg Otherwise send default msg
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post("/api/users/register", { name, email, password });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                // To check if response exists AND message exists, 
                // then send given msg Otherwise send default msg
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
export const signout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({ type: USER_SIGN_OUT })
}

export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId })
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.get(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
    const { userSignin: { userInfo } } = getState();
    try {
        // 2nd parameter is the payload, and 3rd is the options for this request. 
        const { data } = await Axios.put(`/api/users/profile`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}