import axios from 'axios';
import { REGISTER_REQUEST, LOGIN_REQUEST, REGISTER_SUCCESS,  LOGIN_SUCCESS,  REGISTER_FAILURE, LOGIN_FAILURE } from '../type';

export const registerUser = (formData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const res = await axios.post('https://cricslot-back.vercel.app/api/auth/register', formData);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    alert(res.data.msg);
    return res;
  } catch (err) {
    dispatch({ type: REGISTER_FAILURE, payload: err.response.data.msg });
     console.log(err, "error");
     alert(err.response.data.msg, "err.response.data.msg");
   // alert(err.response.data.errors[0].msg);
  }
};

export const loginUser = (formData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post('https://cricslot-back.vercel.app/api/auth/login', formData);
    // Extract token and user data from the response
    const { token, user } = res.data;
    // Save the token in local storage
    localStorage.setItem('token', token);
    dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
       // Optional: Set token in axios headers if needed for subsequent requests
     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    alert(res.data.msg); // Alert success message
    return res;
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err.response.data.msg });
    alert(err.response.data.msg); // Alert error message
  }
};
