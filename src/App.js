import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import BookingForm from './components/BookingForm';
import BookingSuccessful from './components/BookingSuccessful';
import Catalog from './components/Catalog';
import CatalogItemDetail from './components/CatalogItemDetail';
import RecyclingTracking from './components/RecyclingTracking';
import EducationalContent from './components/EducationalContent';
import RecyclingCenters from './components/RecyclingCenters';
import Login from './components/Login';
import Register from './components/Register';
import AppToolbar from './components/AppToolbar';
import ItemListing from './components/ItemListing';
import ProtectedRoute from './components/ProtectedRoute';
import CategoryList from './components/CategoryList';
import ItemsPage from './components/ItemsPage';
import CartPage from './components/CartPage';


const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    shadows: ['0px 3px 5px 2px rgba(255, 105, 135, .3)'], // Update the shadow configuration
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <AppToolbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book-collection" element={<ProtectedRoute element={<BookingForm />} />} />
          <Route path="/booking-successful" element={<ProtectedRoute element={<BookingSuccessful />} />} />
          <Route path="/catalog" element={<ProtectedRoute element={<Catalog />} />} />
          <Route path="/catalog/:id" element={<ProtectedRoute element={<CatalogItemDetail />} />} />
          <Route path="/recycling-tracking" element={<ProtectedRoute element={<RecyclingTracking />} />} />
          <Route path="/educational-content" element={<EducationalContent />} />
          <Route path="/recycling-centers" element={<RecyclingCenters />} />
          <Route path="/item-listing" element={<ItemListing />} />
          <Route path="/category-list" element={<CategoryList />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
    </ThemeProvider>
  );
};

export default App;
