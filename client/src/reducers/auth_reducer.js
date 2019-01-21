import { AUTH_ATTEMPTING , AUTH_SUCCESS , AUTH_FAILED , USER_LOGGED_OUT , PROFILE_FETCHED} from '../actions/types';
const initialState = {
    attempting: false,
    isAuth: false,
    profile: {},
    error: {}
}

export default (state = initialState , action) => {
    switch(action.type) {
        case AUTH_ATTEMPTING:
            return {
                ...state,
                attempting: true,
                isAuth: false,
                error: {}
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                attempting: false,
                isAuth: true,
                error: {}
            }
        case AUTH_FAILED:
            return {
                ...state,
                attempting: false,
                isAuth: false,
                error: action.payload
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                attempting: true,
                isAuth: false,
                profile: {},
                error: {}
            }
        case PROFILE_FETCHED:
            return {
                ...state,
                attempting: true,
                isAuth: true,
                profile: action.payload,
                error: {}
            }
        default:
            return state;
    }
}