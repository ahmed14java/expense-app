import { ADD_ERROR , CLEAR_ERRORS } from './types';
import axios from 'axios';

export const addErrorMessage = (error) => dispatch => {
    try {
        await axios.post('/api/v1/expense' , expenseData);
        dispatch({
            type: EXPENSE_SAVED
        })
        
    } catch (err) {
        console.log(err);
    }
}

export const clearMessage = error => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    })
}