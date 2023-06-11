import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, FormControlLabel, Switch, Avatar, Badge } from '@mui/material';
import { Settings as SettingsIcon, Menu as MenuIcon, AccountCircle, Login } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';
import logo from '../ecologo.png';
import { CartContext } from './CartContext';


function AppToolbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, setIsAuth, user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { cartItemCount } = useContext(CartContext); 


  const handleLogout = () => {
    AuthService.logout();
    setIsAuth(false);
    navigate('/login');
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleThemeChange = (event) => {
    setDarkMode(event.target.checked);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleCart = () => {
    navigate('/cart', { state: { quantities: cartItems } });
  };
  

  return (
    <AppBar position="static">
      <Toolbar>
        <img src={logo} alt="Logo" style={{ maxHeight: '50px' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EcoGadget
        </Typography>
        <IconButton color="inherit" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="navigation-menu"
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleNavigation('/')}>Home</MenuItem>
          <MenuItem onClick={() => handleNavigation('/profile')}>Profile</MenuItem>
        </Menu>
        {isAuth ? (
          <IconButton color="inherit" onClick={handleLogout}>
            <AccountCircle />
          </IconButton>
        ) : (
          <IconButton color="inherit" onClick={() => navigate('/login')}>
            <Login />
          </IconButton>
        )}
        <IconButton color="inherit" onClick={handleCart}>
          <Badge badgeContent={cartItemCount} color="secondary"> {/* Use cartItemCount for the badge content */}
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={handleClick}>
          <SettingsIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={handleThemeChange} />}
              label={darkMode ? 'Dark Mode' : 'Light Mode'}
            />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default AppToolbar;



