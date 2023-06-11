import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

const eWasteItems = [
    { id: 1, name: 'Mobile Phone', category: 'Electronics' },
    { id: 2, name: 'Laptop', category: 'Computers' },
    { id: 3, name: 'LCD Monitor', category: 'Monitors' },
    { id: 4, name: 'Tablet', category: 'Electronics' },
    { id: 5, name: 'Printer', category: 'Peripherals' },
    { id: 6, name: 'Television', category: 'Home Appliances' },
    { id: 7, name: 'Air Conditioner', category: 'Home Appliances' },
    { id: 8, name: 'Washing Machine', category: 'Home Appliances' },
    { id: 9, name: 'Refrigerator', category: 'Home Appliances' },
    // Add more items as needed
  ];

const ItemPaper = styled(Paper)({
  height: 140,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0px 0px 14px 1px rgba(0, 0, 0, 0.2)',
  },
});

const Catalog = () => {
  return (
    <Box>
    <Box sx={{ flexGrow: 1, m: 3 }}>
      <Grid container spacing={3}>
        {eWasteItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Link to={`/catalog/${item.id}`} style={{ textDecoration: 'none' }}>
              <ItemPaper elevation={3}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.category}
                </Typography>
              </ItemPaper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Box>
  );
};

export default Catalog;




