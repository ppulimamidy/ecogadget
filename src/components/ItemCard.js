import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

const ItemCard = ({ item, handleDelete, handleUpdate }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {item.name}
        </Typography>
        <Typography>
          Category: {item.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => handleUpdate(item)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => handleDelete(item.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
