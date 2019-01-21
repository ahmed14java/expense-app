import { EXPENSE_SAVED , RESET_SAVED_FLAG , FETCHING_EXPENSE , FETCHED_SUCCESS , FETCHIED_FAILED} from '../actions/types';

const initialState = {
    saved: false,
    fetching: false,
    expense: []
};
export default (state = initialState , action) => {
    switch(action.type){

        case FETCHING_EXPENSE:
            return {
                ...state,
                fetching: true
            }
        case FETCHED_SUCCESS:
            return {
                ...state,
                fetching: false,
                expense: action.payload
            }
        case FETCHIED_FAILED:
            return {
                ...state,
                fetching: false
            }

        case EXPENSE_SAVED:
            return {
                ...state,
                saved: true
            }
        case RESET_SAVED_FLAG:
            return {
                ...state,
                saved: false
            }
        default:
            return state;
    }
}