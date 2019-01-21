import { AUTH_ATTEMPTING , AUTH_SUCCESS , AUTH_FAILED , USER_LOGGED_OUT , PROFILE_FETCHED } from './types';
import axios from 'axios';
import setJwtToken from '../securityUtils/setJwtToken';

export const signIn = (request_data) => async dispatch => {
    dispatch({
        type: AUTH_ATTEMPTING,
    })
    try {
        const { data } = await axios.post('/api/v1/auth' , request_data);
        console.log(data);
        const { token } = data;
        localStorage.setItem('jwt' , token);
        setJwtToken(token);
        dispatch({
            type: AUTH_SUCCESS
        })
        dispatch(
            getUserProfile(token)
        )
    } catch (e) {
        console.error(e.response.data);
        dispatch({
            type: AUTH_FAILED,
            payload: e.response.data
        })
    }
}

export const onLoadingSignIn = () => async dispatch => {
    try {
        const token = localStorage.getItem('jwt');
        if (token === null || token === 'undefined') {
          return dispatch({
                type: AUTH_FAILED,
                payload: 'You need to login'
            })
        }
        dispatch({
            type: AUTH_SUCCESS,
        })
        setJwtToken(token);
        dispatch(
            getUserProfile(token)
        )
        
    } catch (err) {
        
    }
}

export const logout = () => dispatch => {
    localStorage.clear();
    dispatch({
        type: USER_LOGGED_OUT
    })
}

export const getUserProfile = (token) => async dispatch => {
    try {
        const { data: {user} } = await axios.get('/api/v1/user');
        dispatch({
            type: PROFILE_FETCHED,
            payload: user
        })
        
    } catch (err) {
        console.log(err);
        
    }
}