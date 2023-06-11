import React, { useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, useMediaQuery, Paper, Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ComputerIcon from '@mui/icons-material/Computer';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import TvIcon from '@mui/icons-material/Tv';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import KitchenIcon from '@mui/icons-material/Kitchen';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ToysIcon from '@mui/icons-material/Toys';
import ElectricMopedIcon from '@mui/icons-material/ElectricMoped';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleItemClick = async (category) => {
    setSelectedCategory(category.name);

    try {
      const response = await axios.get(`http://localhost:3001/api/items/${category.name}`);
      const items = response.data;

      navigate('/items', { state: { items } });
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  const categories = [
    { name: 'Electronics', icon: <DevicesOtherIcon fontSize="large" /> },
    { name: 'Computers', icon: <DesktopMacIcon fontSize="large" /> },
    { name: 'Monitors', icon: <TvIcon fontSize="large" /> },
    { name: 'Peripherals', icon: <ElectricalServicesIcon fontSize="large" /> },
    { name: 'Home Appliances', icon: <KitchenIcon fontSize="large" /> },
    { name: 'Batteries', icon: <BatteryChargingFullIcon fontSize="large" /> },
    { name: 'E-Toys', icon: <ToysIcon fontSize="large" /> },
    { name: 'Electrical Motors', icon: <ElectricMopedIcon fontSize="large" /> },
    { name: 'Other', icon: <DeleteSweepIcon fontSize="large" /> },
  ];

  return (
    <Box mt={3}>
      <Grid container spacing={isMobile ? 2 : 3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper
              elevation={selectedCategory === category.name ? 12 : 3}
              sx={{
                transition: '0.3s',
                transform: selectedCategory === category.name ? 'scale(1.05)' : 'none',
                borderColor: selectedCategory === category.name ? 'primary.main' : 'transparent',
                border: 2,
              }}
            >
              <List>
                <ListItem button onClick={() => handleItemClick(category)}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    {category.icon}
                    <ListItemText primary={category.name} primaryTypographyProps={{ variant: 'h6', align: 'center' }} />
                  </Box>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryList;

