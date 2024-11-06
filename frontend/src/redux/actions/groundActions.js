// import axios from 'axios';
import axiosInstance from '../../authToken';
// Action types
const FETCH_GROUNDS_REQUEST = 'FETCH_GROUNDS_REQUEST';
const FETCH_GROUNDS_SUCCESS = 'FETCH_GROUNDS_SUCCESS';
const FETCH_GROUNDS_FAILURE = 'FETCH_GROUNDS_FAILURE';

export const FETCH_GROUNDS_REQUEST_USER = 'FETCH_GROUNDS_REQUEST_USER';
export const FETCH_GROUNDS_SUCCESS_USER = 'FETCH_GROUNDS_SUCCESS_USER';
export const FETCH_GROUNDS_FAILURE_USER = 'FETCH_GROUNDS_FAILURE_USER';

export const UPDATE_GROUND_REQUEST = 'UPDATE_GROUND_REQUEST';
export const UPDATE_GROUND_SUCCESS = 'UPDATE_GROUND_SUCCESS';
export const UPDATE_GROUND_FAILURE = 'UPDATE_GROUND_FAILURE';

export const createGround = (groundData) => async (dispatch,getState) => {
  try {
    const token = getState().auth.token;
    console.log(token, "token");
    const res = await axiosInstance.post('/auth/createGrounds', groundData); // Adjust API endpoint as needed
    dispatch({ type: 'CREATE_GROUND_SUCCESS', payload: res.data });
    return Promise.resolve(res.data); // Return a resolved promise if successful
  } catch (err) {
    dispatch({ type: 'CREATE_GROUND_FAILURE', payload: err.response.data.msg });
    return Promise.reject(err); // Return a rejected promise if there's an error
  }
};
export const updateGround = (entry) => async (dispatch, getState) => {
  debugger;
  console.log(entry, "entry");
  try {
    const token = getState().auth.token; // Get the token from the state
    console.log(token, "token");
    
    // Use the groundData to send the appropriate update request
    const res = await axiosInstance.put(`/auth/grounds/${entry.id}`, entry); // Adjust API endpoint as needed
    
    // Dispatch success action with the updated ground data
    dispatch({ type: 'UPDATE_GROUND_SUCCESS', payload: res.data });
    return Promise.resolve(res.data); // Return a resolved promise if successful
  } catch (err) {
    // Dispatch failure action with the error message
    dispatch({ type: 'UPDATE_GROUND_FAILURE', payload: err.response ? err.response.data.msg : 'Update failed' });
    return Promise.reject(err); // Return a rejected promise if there's an error
  }
};
// Fetch Grounds Action
export const fetchGrounds = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_GROUNDS_REQUEST });
    try {
      const response = await axiosInstance.get('/auth/myGrounds'); // Adjust the URL as needed
      dispatch({ type: FETCH_GROUNDS_SUCCESS, payload: response.data });
      return Promise.resolve(response.data); // Return a resolved promise if successful
    } catch (error) {
      dispatch({ type: FETCH_GROUNDS_FAILURE, payload: error.message });
      return Promise.reject(error); // Return a rejected promise if there's an error
    }
  };
};

export const fetchUserGrounds = () => async dispatch => {
  dispatch({ type: FETCH_GROUNDS_REQUEST_USER });
  try {
    const response = await axiosInstance.get('/auth/grounds'); // API to fetch all grounds
    dispatch({ type: FETCH_GROUNDS_SUCCESS_USER, payload: response.data.grounds });
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch({ type: FETCH_GROUNDS_FAILURE_USER, payload: error.message });
    return Promise.reject(error); // Return a rejected promise if there's an error
  }
};


