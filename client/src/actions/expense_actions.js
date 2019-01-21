import { EXPENSE_SAVED , RESET_SAVED_FLAG , FETCHING_EXPENSE , FETCHED_SUCCESS , FETCHIED_FAILED} from './types';
import axios from 'axios';

export const createExpense = (expenseData) => async dispatch => {
    try {
        await axios.post('/api/v1/expense' , expenseData);
        dispatch({
            type: EXPENSE_SAVED
        })
        dispatch({
            type: RESET_SAVED_FLAG
        })
    } catch (err) {
        console.log(err);
    }
}

export const getExpense =  (month) => async dispatch => {
    const prefix = '/api/v1/expense';
    const url = month ? `${prefix}/${month}` : prefix;
    try {
        dispatch({
            type: FETCHING_EXPENSE
        })
        const { data } = await axios.get(url);
         dispatch({
            type: FETCHED_SUCCESS,
            payload: data.expense
        })
        
    } catch (err) {
        dispatch({
            type: FETCHIED_FAILED
        })
    }
}