import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { loginUser } from '../redux/actions/authActions'; // Import the login action

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch(); // Hook for dispatching actions
  const navigate = useNavigate(); // Hook for navigation

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(formData)); // Call the login action
    // Store the token in localStorage
    // if(res.data.token){
    //   localStorage.setItem('token', res.data.token); // Assume your response contains a token
    // }
    debugger;
    if (res) {
      // localStorage.setItem('token', res.data.token);
      if(res.data.user.role === "groundOwner"){
        navigate('/admin-dashboard'); // Navigate to dashboard or desired page upon successful login
      }
      if(res.data.user.role === "user"){
        navigate('/user-dashboard');
      }
    }
  };

  return (
    <Box
      sx={{
        width: '400px',
        margin: 'auto',
        marginTop: '50px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom style={{ color: '#3f51b5' }}>
        Login
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          variant="outlined"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px', padding: '10px 0' }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
