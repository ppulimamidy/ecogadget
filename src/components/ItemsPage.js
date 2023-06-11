import { CartContext } from './CartContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Grid, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import * as React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const ItemsPage = () => {
  const location = useLocation();
  const items = location.state.items;
  const { addToCart } = useContext(CartContext); // the function is called addToCart, not addItemToCart

  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (type, quantity) => {
    setQuantities(prevQuantities => ({ ...prevQuantities, [type]: quantity }));
  };

  const navigate = useNavigate();

  const handleAddToCart = () => { // Renaming the function to avoid naming conflict
    Object.entries(quantities).forEach(([type, quantity]) => {
      const category = items.find(item => item.itemTypes.includes(type)).category;
      addToCart({ id: `${type}-${category}`, category, type, quantity: parseInt(quantity, 10) });
    });
    navigate("/cart"); // Navigate to the cart page after adding items to cart
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Typography variant="h4">{item.category}</Typography>
            {item.itemTypes.map((type, typeIndex) => (
              <Card key={typeIndex} style={{ margin: '10px 0', maxWidth: '37.5%' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="body1">{type}</Typography>
                  <TextField
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 9999 } }}
                    variant="outlined"
                    size="small"
                    style={{ marginTop: 10, maxWidth: '60px' }}
                    value={quantities[type] || ''}
                    onChange={e => handleQuantityChange(type, e.target.value)}
                  />
                </CardContent>
              </Card>
            ))}
          </Grid>
        ))}
        <Button variant="contained" color="primary" startIcon={<AddShoppingCartIcon />} onClick={handleAddToCart} style={{ margin: '20px auto', display: 'block' }}>
          Add to Shopping Cart
        </Button>
      </Grid>
    </div>
  );
};

export default ItemsPage;

