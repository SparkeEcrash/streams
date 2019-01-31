import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

export default (state = {INITIAL_STATE}, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload }   //get all objects in 'state' and overwrite isSignedIn to be true
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null}   //get all objects in 'state' and overwrite isSignedIn to be false
        default:
            return state;
    }
};