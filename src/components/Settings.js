import React from 'react';
import { Box, Switch, Typography, FormControlLabel } from '@mui/material';

const Settings = ({ darkMode, setDarkMode }) => {
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={handleThemeChange} />}
        label="Dark Mode"
      />
    </Box>
  );
};

export default Settings;
