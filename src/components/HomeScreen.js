import React from 'react';
import { Typography, Button, Grid, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ flexGrow: 1, m: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Welcome to EcoGadget
              </Typography>
              <Typography variant="body1" gutterBottom>
                Your one-stop solution for e-waste management.
                Manage your e-waste responsibly and effortlessly.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" component="h3" gutterBottom>
                E-Waste Cataloging
              </Typography>
              <Button variant="outlined" color="primary" onClick={() => navigate('/item-listing')}>
                Go to Catalog
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Book a Collection
              </Typography>
              <Button variant="outlined" color="primary" onClick={() => navigate('/book-collection')}>
                Book Now
              </Button>
            </Paper>
          </Grid>
          {/* Add more features as needed */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" component="h3" gutterBottom>
                RecyclingTracking
              </Typography>
              <Button variant="outlined" color="primary" onClick={() => navigate('/recycling-tracking')}>
                Check Now
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Educational Content
              </Typography>
              <Button variant="outlined" color="primary" onClick={() => navigate('/educational-content')}>
                Read Now
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Local Recycling Centers
              </Typography>
              <Button variant="outlined" color="primary" onClick={() => navigate('/recycling-centers')}>
                Find Now
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Items Listing
              </Typography>
              <Button variant="outlined" color="primary" onClick={() => navigate('/item-listing')}>
                Find Now
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomeScreen;
