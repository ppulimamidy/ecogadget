import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

import axios from 'axios';

const RecyclingTracking = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3001/api/bookings');
      setRows(res.data.map((booking) => ({ ...booking, id: booking._id })));
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'items', headerName: 'Items', width: 200 },
    { field: 'pickupDate', headerName: 'Pick-up Date', width: 150 },
    { field: 'pickupTime', headerName: 'Pick-up Time', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  return (
    <Box>
    <div style={{ height: 400, width: '100%', marginTop: '2rem' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} loading={loading} />
    </div>
    </Box>
  );
};

export default RecyclingTracking;
