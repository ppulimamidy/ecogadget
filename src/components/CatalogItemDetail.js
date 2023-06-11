import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';


const eWasteItems = [
    { id: 1, name: 'Mobile Phone', category: 'Electronics', description: 'Used mobile phone.' },
    { id: 2, name: 'Laptop', category: 'Computers', description: 'Used laptop.' },
    { id: 3, name: 'LCD Monitor', category: 'Monitors', description: 'Used LCD monitor.' },
    { id: 4, name: 'Tablet', category: 'Electronics', description: 'Used tablet.' },
    { id: 5, name: 'Printer', category: 'Peripherals', description: 'Used printer.' },
    { id: 6, name: 'Television', category: 'Home Appliances', description: 'Used television.' },
    { id: 7, name: 'Air Conditioner', category: 'Home Appliances', description: 'Used air conditioner.' },
    { id: 8, name: 'Washing Machine', category: 'Home Appliances', description: 'Used washing machine.' },
    { id: 9, name: 'Refrigerator', category: 'Home Appliances', description: 'Used refrigerator.' },
    // Add more items as needed
  ];

const DetailBox = styled(Box)({
  backgroundColor: '#f5f5f5',
  borderRadius: 10,
  padding: '2rem',
});

const CatalogItemDetail = () => {
  const { id } = useParams();
  const item = eWasteItems.find((item) => item.id === Number(id));

  if (!item) {
    return <p>Item not found.</p>;
  }

  return (
    <Box>
    <DetailBox sx={{ flexGrow: 1, m: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {item.name}
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Category: {item.category}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Description: {item.description}
      </Typography>
    </DetailBox>
    </Box>
  );
};

export default CatalogItemDetail;


