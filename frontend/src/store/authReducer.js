import * as types from './actionTypes';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          userId: action.payload.userId,
          login: action.payload.login
        },
        error: null
      };
    case types.AUTH_LOGOUT:
      return {
        ...initialState
      };
    case types.AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

