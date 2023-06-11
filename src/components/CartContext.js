// CartContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0); // New state variable


  // Retrieve cart items from the server on component mount
  useEffect(() => {
    // Calculate the total count of cart items
    let totalCount = 0;
    if (Array.isArray(cartItems)) {
      totalCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    }
    setCartItemCount(totalCount);
  }, [cartItems]);
  
  

  // Fetch cart items from the server
  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items', error);
    }
  };

// Add item to the cart
const addItemToCart = async (item) => {
  try {
    const response = await axios.post('http://localhost:3001/api/cart', {
      id: item.type, // Assuming the type is a unique identifier
      name: item.type, // You may need to replace this with the correct value
      category: item.category,
      quantity: parseInt(item.quantity, 10)
    });
    setCartItems(response.data.cartitems);
    setCartItemCount(prevCount => prevCount + item.quantity);  // update cartItemCount
  } catch (error) {
    console.error('Error adding item to cart', error);
  }
};


  // Update quantity of an item in the cart
const updateCartItemQuantity = async (itemId, quantity) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/cart/${itemId}`, { quantity });
      setCartItems(response.data);
      // get the difference in quantity and update cartItemCount
      const item = cartItems.find(item => item.type === itemId);
      const quantityDifference = quantity - item.quantity;
      setCartItemCount(prevCount => prevCount + quantityDifference);
    } catch (error) {
      console.error('Error updating item quantity', error);
    }
  };

  // Remove item from the cart
const removeItemFromCart = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/cart/${itemId}`);
      setCartItems(response.data);
      // subtract the quantity of the removed item from cartItemCount
      const item = cartItems.find(item => item.type === itemId);
      setCartItemCount(prevCount => prevCount - item.quantity);
    } catch (error) {
      console.error('Error removing item from cart', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        updateCartItemQuantity,
        removeItemFromCart,
        setCartItems,
        cartItemCount, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
