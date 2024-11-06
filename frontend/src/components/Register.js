// frontend/src/components/Register.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { registerUser } from '../redux/actions/authActions';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user', // default value is 'user'
  });

  const dispatch = useDispatch(); // Hook for dispatching actions
  const navigate = useNavigate(); // Hook for navigation

  const { username, email, password, role } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser(formData));
    if (res && res.status === 201) {
      navigate('/login'); // Navigate to login screen if registration is successful
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
        Register
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          variant="outlined"
          name="username"
          value={username}
          onChange={onChange}
          required
        />
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
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select name="role" value={role} onChange={onChange} required>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="groundOwner">Ground Owner</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px', padding: '10px 0' }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
