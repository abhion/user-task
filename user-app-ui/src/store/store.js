import { createStore, combineReducers, applyMiddleware } from 'redux';
import authenticationReducer from '../reducers/authenticateReducer';
import userReducer from '../reducers/userReducer';
import thunk from 'redux-thunk';

const configureStore = () => {
    const store = createStore(combineReducers({
        authenticated: authenticationReducer,
        user: userReducer 
    }), applyMiddleware(thunk))

    return store;
}

export default configureStore;