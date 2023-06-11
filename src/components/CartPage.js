import React, { useState, useEffect, useContext } from 'react';
import { Button, IconButton, Typography, Card, CardContent, TextField } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

const CartPage = () => {
  const location = useLocation();
  const { quantities, items } = location.state || {};
  const { cartItems, updateCartItemQuantity, removeItemFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const checkout = () => {
    // Create a comma-separated string of items and quantities
    const itemsString = cart
      .map(item => `${item.category}: ${item.type} (Quantity: ${item.quantity})`)
      .join(', ');

    // Navigate to the BookingForm page with the items pre-filled
    navigate('/book-collection', {
      state: {
        preFilledItems: itemsString
      }
    });
  };

  const handleSubmit = () => {
    navigate('/book-collection', {
      state: {
        cartItems: cart
      }
    });
  };

  /* useEffect(() => {
    const newCartItems = Object.entries(quantities).map(([type, quantity]) => ({
      category: items.find(item => item.itemTypes.includes(type)).category,
      type,
      quantity: parseInt(quantity)
    }));
    setCart(newCartItems);
  }, [quantities, items]);
  */

  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  const updateQuantity = (itemToUpdate, newQuantity) => {
    updateCartItemQuantity(itemToUpdate.type, newQuantity);
  };

  const removeFromCart = (itemToRemove) => {
    removeItemFromCart(itemToRemove.type);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: 30 }}>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1" align="center">
          Your cart is empty
        </Typography>
      ) : (
        Array.isArray(cart) && cart.map((item, index) => (
          <Card key={index} style={{ margin: '10px 0', maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1">
                {item.category}: {item.type}
              </Typography>
              <TextField
                type="number"
                InputProps={{ inputProps: { min: 1, max: 9999 } }}
                variant="outlined"
                size="small"
                style={{ marginLeft: 10, width: '80px' }}
                value={item.quantity}
                onChange={(e) => updateQuantity(item, parseInt(e.target.value))}
              />
              <IconButton onClick={() => removeFromCart(item)} style={{ marginLeft: 'auto' }}>
                <RemoveShoppingCartIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))
      )}
      {cart.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          style={{ marginTop: 30, width: '50%', marginLeft: 'auto', marginRight: 'auto' }}
          onClick={handleSubmit}
        >
          Checkout
        </Button>
      )}
    </div>
  );
};

export default CartPage;
