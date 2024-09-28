// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import productReducer from './reducers/productreducer';
import categoryReducer from './reducers/categoryReducer';
const rootReducer = combineReducers({
  productData: productReducer,
  categoryData: categoryReducer,
});
console.log("Reducers are:",rootReducer);
const store = createStore(rootReducer, applyMiddleware(thunk));
console.log("store is:",store)
export default store;
