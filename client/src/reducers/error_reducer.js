import { ADD_ERROR , CLEAR_ERRORS } from '../actions/types';

const initialState = {
    message: null
};
export default (state = initialState , action) => {
    switch(action.type){
        case ADD_ERROR:
            return {
                ...state,
                message: action.payload
            }
        case CLEAR_ERRORS:
            return {
                initialState
            }
        default:
            return state;
    }
}