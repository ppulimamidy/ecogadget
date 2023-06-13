import React, { createContext, useState, useEffect , useCallback } from 'react';
import axios from 'axios';
import AuthService from '../services/AuthService'; // import AuthService

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const fetchCartItems = useCallback(async () => {
    const axiosConfig = {
      headers: { Authorization: `Bearer ${AuthService.getToken()}` },
    };

    try {
      const response = await axios.get('http://localhost:3001/api/cart', axiosConfig);
      setCartItems(response.data);
      console.log("Context cartItems:", response.data);
    } catch (error) {
      console.error('Error fetching cart items', error);
    }
  }, []);
  
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  useEffect(() => {
    const totalCount = Array.isArray(cartItems)
      ? cartItems.reduce((count, item) => count + item.quantity, 0)
      : 0;
    setCartItemCount(totalCount);
  }, [cartItems]);

  const addToCart = async (item) => {
    const axiosConfig = {
      headers: { Authorization: `Bearer ${AuthService.getToken()}` },
    };

    try {
      const response = await axios.post('http://localhost:3001/api/cart', {
        id: item.id,
        type: item.type,
        category: item.category,
        quantity: parseInt(item.quantity, 10),
      }, axiosConfig); 
    } catch (error) {
      console.error('Error adding item to cart', error);
    }
    fetchCartItems();
  };

  const updateCartItemQuantity = async (itemId, quantity) => {
    const axiosConfig = {
      headers: { Authorization: `Bearer ${AuthService.getToken()}` },
    };

    try {
      const response = await axios.put(`http://localhost:3001/api/cart/${itemId}`, { quantity }, axiosConfig);
       // Update cart after successfully updating an item
    } catch (error) {
      console.error('Error updating item quantity', error);
    }
    fetchCartItems();
  };

  const removeItemFromCart = async (itemToRemove) => {
    const axiosConfig = {
      headers: { Authorization: `Bearer ${AuthService.getToken()}` },
    };

    try {
      const response = await axios.delete(`http://localhost:3001/api/cart/${itemToRemove._id}`, axiosConfig);

       // Update cart after successfully removing an item
    } catch (error) {
      console.error('Error removing item from cart', error);
    }
    fetchCartItems();
  };

  const checkoutCart = async () => {
    const axiosConfig = {
      headers: { Authorization: `Bearer ${AuthService.getToken()}` },
    };

    try {
      await axios.post('http://localhost:3001/api/cart/checkout', null, axiosConfig);
      setCartItems([]); // Clear cart after successfully checking out
    } catch (error) {
      console.error('Error checking out cart', error);
    }
    fetchCartItems();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeItemFromCart,
        setCartItems,
        cartItemCount,
        checkoutCart,
        fetchCartItems, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
