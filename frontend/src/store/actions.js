import axios from 'axios';
import * as types from './actionTypes';

const API_BASE = '/lab4/api';

export const login = (loginData) => async (dispatch) => {
  dispatch({ type: types.UI_SET_LOADING, payload: true });
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, loginData);
    dispatch({ type: types.AUTH_LOGIN_SUCCESS, payload: response.data });
    dispatch({ type: types.UI_SET_LOADING, payload: false });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    dispatch({ type: types.AUTH_ERROR, payload: message });
    dispatch({ type: types.UI_SET_LOADING, payload: false });
    throw error;
  }
};

export const register = (loginData) => async (dispatch) => {
  dispatch({ type: types.UI_SET_LOADING, payload: true });
  try {
    const response = await axios.post(`${API_BASE}/auth/register`, loginData);
    dispatch({ type: types.AUTH_LOGIN_SUCCESS, payload: response.data });
    dispatch({ type: types.UI_SET_LOADING, payload: false });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed';
    dispatch({ type: types.AUTH_ERROR, payload: message });
    dispatch({ type: types.UI_SET_LOADING, payload: false });
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post(`${API_BASE}/auth/logout`);
    dispatch({ type: types.AUTH_LOGOUT });
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const checkAuth = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE}/auth/me`);
    dispatch({ type: types.AUTH_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.AUTH_LOGOUT });
  }
};

export const fetchResults = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE}/results`);
    dispatch({ type: types.RESULTS_FETCH_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.RESULTS_ERROR, payload: error.message });
  }
};

export const checkPoint = (pointData) => async (dispatch) => {
  dispatch({ type: types.UI_SET_LOADING, payload: true });
  try {
    const response = await axios.post(`${API_BASE}/results/check`, pointData);
    dispatch({ type: types.RESULTS_ADD, payload: response.data });
    dispatch({ type: types.UI_SET_LOADING, payload: false });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Check failed';
    dispatch({ type: types.RESULTS_ERROR, payload: message });
    dispatch({ type: types.UI_SET_LOADING, payload: false });
    throw error;
  }
};

export const clearResults = () => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE}/results`);
    dispatch({ type: types.RESULTS_CLEAR });
  } catch (error) {
    dispatch({ type: types.RESULTS_ERROR, payload: error.message });
  }
};

