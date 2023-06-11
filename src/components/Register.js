import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await AuthService.register(data.username, data.email, data.password);
            setUser(response.data);
            navigate("/login");
        } catch (err) {
            if (err.response.data.message === "User already exists") {
                setError("This email is already registered. Please log in or use a different email.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    }
    

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <TextField
                {...register('username', { required: true })}
                label="Username"
                variant="outlined"
                error={!!errors.username}
                helperText={errors.username ? 'Username is required.' : ' '}
                fullWidth
                margin="normal"
            />
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
            {error && (
                <Alert severity="error">{error}</Alert>
            )}
            <Button type="submit" variant="contained">Register</Button>
        </Box>
    );
}
