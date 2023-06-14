import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import AuthService from '../services/AuthService';
import axios from 'axios';

const RecyclingTracking = () => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const axiosConfig = {
        headers: { Authorization: `Bearer ${AuthService.getToken()}` },
      };
      const res = await axios.get('http://localhost:3001/api/bookings', axiosConfig);
      setRows(res.data.map((booking) => ({ ...booking, id: booking._id })));
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', width: isXSmall ? 100 : isSmall ? 130 : 150 },
    { field: 'email', headerName: 'Email', width: isXSmall ? 150 : isSmall ? 180 : 200 },
    { field: 'pickupAddress', headerName: 'Address', width: isXSmall ? 200 : isSmall ? 250 : 300 },
    { field: 'items', headerName: 'Items', width: isXSmall ? 150 : isSmall ? 180 : 200 },
    { field: 'pickupDate', headerName: 'Pick-up Date', width: isXSmall ? 100 : isSmall ? 130 : 150 },
    { field: 'pickupTime', headerName: 'Pick-up Time', width: isXSmall ? 100 : isSmall ? 130 : 150 },
    { field: 'status', headerName: 'Status', width: isXSmall ? 80 : isSmall ? 100 : 120 },
  ];

  return (
    <Box sx={{ p: 2, height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} loading={loading} />
    </Box>
  );
};

export default RecyclingTracking;

