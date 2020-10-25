import {SIGN_IN, LOG_OUT, UPDATE_PROFILE } from "../actionTypes";

const initialState = {
    token: null,
    user: {},
    isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                token: action.token,
                user: action.user,
                isAuthenticated: true
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                user: action.user,
            };
        case LOG_OUT:
            return initialState;
        default:
            return state;
    }
}

export default authReducer;