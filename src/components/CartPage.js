import React, { useContext, useEffect } from 'react';
import { Button, IconButton, Typography, Card, CardContent, TextField, Container } from '@mui/material';
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
    checkoutCart();
    navigate('/book-collection', {
      state: { cartItems: cartItems },
    });
  };

  const updateQuantity = (itemToUpdate, newQuantity) => {
    updateCartItemQuantity(itemToUpdate._id, newQuantity);
  };

  const removeFromCart = (itemToRemove) => {
    console.log("the values in the item are :" , itemToRemove);
    removeItemFromCart(itemToRemove);
  };

  return (
    <Container maxWidth="md">
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
          <Card key={index} style={{ margin: '10px auto' }}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1">
                {item.category}: {item.type}
              </Typography>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <TextField
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: 9999 } }}
                  variant="outlined"
                  size="small"
                  style={{ width: '80px' }}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item, parseInt(e.target.value))}
                />
                <IconButton onClick={() => removeFromCart(item)} style={{ marginLeft: 10 }}>
                  <RemoveShoppingCartIcon />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))
      )}
      {cartItems && cartItems.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          style={{ marginTop: 30, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          onClick={handleSubmit}
        >
          Checkout
        </Button>
      )}
    </Container>
  );
};

export default CartPage;



