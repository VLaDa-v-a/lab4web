import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './authReducer';
import resultsReducer from './resultsReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  results: resultsReducer,
  ui: uiReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

