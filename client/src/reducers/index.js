import { combineReducers } from 'redux';
import auth_reducer from './auth_reducer';
import expense_reducer from './expense_reducer';
import error_reducer from './error_reducer';

export default combineReducers({
    auth: auth_reducer,
    expense: expense_reducer,
    errors: error_reducer
});