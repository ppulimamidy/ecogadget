import React, { useContext, useEffect } from 'react';
import { Button, IconButton, Typography, Card, CardContent, TextField } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, updateCartItemQuantity, removeItemFromCart, fetchCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const checkoutCart = () => {
    const itemsString = cartItems
      .map(item => `${item.category}: ${item.type} (Quantity: ${item.quantity})`)
      .join(', ');

    navigate('/book-collection', {
      state: { preFilledItems: itemsString },
    });
  };

  const handleSubmit = () => {
    checkoutCart(); // Call the function to checkout the cart
    navigate('/book-collection', {
      state: { cartItems: cartItems },
    });
  };

  const updateQuantity = (itemToUpdate, newQuantity) => {
    updateCartItemQuantity(itemToUpdate.id, newQuantity);
  };
  
  const removeFromCart = (itemToRemove) => {
    removeItemFromCart(itemToRemove.id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: 30 }}>
        Shopping Cart
      </Typography>
      {!cartItems || cartItems.length === 0 ? (
        <Typography variant="body1" align="center">
          Your cart is empty
        </Typography>
      ) : (
        Array.isArray(cartItems) &&
        cartItems.map((item, index) => (
          <Card key={index} style={{ margin: '10px 0', maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1">
                {item.category}: {item.type} {/* Changed this line */}
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
      {cartItems && cartItems.length > 0 && (
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
