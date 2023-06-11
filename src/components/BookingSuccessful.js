import React from 'react';
import { Container, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box } from '@mui/system';

const BookingSuccessful = () => {
    return (
        <Box>
        <Container>
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                height="100vh"
            >
                <CheckCircleOutlineIcon style={{ fontSize: 100, color: 'green' }}/>
                <Typography variant="h4" component="h1" gutterBottom>
                    Booking Successful!
                </Typography>
                <Typography variant="h6" component="h2">
                    You will receive an email confirmation shortly.
                </Typography>
            </Box>
        </Container>
        </Box>
    )
}

export default BookingSuccessful;
