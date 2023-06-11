// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({element}) => {
  const { isAuth } = useContext(AuthContext);
  
  return isAuth ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;



