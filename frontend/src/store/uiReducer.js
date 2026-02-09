import * as types from './actionTypes';

const initialState = {
  loading: false,
  error: null
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case types.UI_SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case types.UI_SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

