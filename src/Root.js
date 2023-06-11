import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import App from './App.js';
import { CartContextProvider } from './components/CartContext';


function Root() {
  return (
    <CartContextProvider>
    <AuthContextProvider>
      <Router>
        <App/>
      </Router>
    </AuthContextProvider>
    </CartContextProvider>
  );
}

export default Root;
