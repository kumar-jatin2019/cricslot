// src/redux/store.js
import { createStore, applyMiddleware , compose} from 'redux';
import {thunk} from 'redux-thunk';
import { combineReducers } from 'redux';
import authReducer from '../redux/reducers/authReducers';
import groundReducer from './reducers/groundReducers';


const rootReducer = combineReducers({
  auth: authReducer,
  grounds: groundReducer, // Add your ground reducer here
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))
export default Store;
