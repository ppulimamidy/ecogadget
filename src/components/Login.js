import React, { useState, useContext  } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/AuthContext'; 

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");  // Add this line
  const { setIsAuth } = useContext(AuthContext);  // Get setIsAuth from context

  const onSubmit = (data) => {
    AuthService.login(data.email, data.password).then(
      () => {
        setIsAuth(true);
        navigate("/");  // Redirect to home or any other route
        
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||  // Change this line
          error.message ||
          error.toString();

        setErrorMessage(resMessage);  // Update this line
      }
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <TextField
        {...register('email', { required: true })}
        label="Email"
        variant="outlined"
        error={!!errors.email}
        helperText={errors.email ? 'Email is required.' : ' '}
        fullWidth
        margin="normal"
      />
      <TextField
        {...register('password', { required: true })}
        type="password"
        label="Password"
        variant="outlined"
        error={!!errors.password}
        helperText={errors.password ? 'Password is required.' : ' '}
        fullWidth
        margin="normal"
      />
      {errorMessage && ( 
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button type="submit" variant="contained" >Login</Button>
        <Button variant="contained" sx={{ ml: 2 }} onClick={() => navigate('/register')}>
                  Register
        </Button>
      </Box>
    </Box>
  );
}
