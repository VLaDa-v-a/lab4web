import * as types from './actionTypes';

const initialState = {
  items: [],
  error: null
};

export default function resultsReducer(state = initialState, action) {
  switch (action.type) {
    case types.RESULTS_FETCH_SUCCESS:
      return {
        ...state,
        items: action.payload,
        error: null
      };
    case types.RESULTS_ADD:
      return {
        ...state,
        items: [action.payload, ...state.items],
        error: null
      };
    case types.RESULTS_CLEAR:
      return {
        ...state,
        items: []
      };
    case types.RESULTS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

