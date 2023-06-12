import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Grid, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Item = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const BookingForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    pickupAddress: '',
    email: '',
    phone: '',
    notes: '',
    items: '',
    pickupDate: null,
    pickupTime: null,
  });

  const location = useLocation();
  const { cartItems } = location.state || {};

  const [errors, setErrors] = useState({});
  const [preFilledItems, setPreFilledItems] = useState(location.state?.preFilledItems || '');

  useEffect(() => {
    if (cartItems) {
      const itemsString = cartItems
        .map(item => `${item.category}: ${item.type} (Quantity: ${item.quantity})`)
        .join(", ");
      setPreFilledItems(itemsString);
      setValues(prevValues => ({ ...prevValues, items: itemsString }));
    }
  }, [cartItems]);
  
  

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setValues({
      ...values,
      pickupDate: date,
    });
  };

  const handleTimeChange = (time) => {
    setValues({
      ...values,
      pickupTime: time,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:3001/api/bookings', values);
      navigate('/booking-successful');
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <Box>
    <Container maxWidth="sm">
      <Box my={4}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Item item xs={12}>
              <TextField name="name" label="Name" variant="outlined" required fullWidth onChange={handleChange} error={errors.name ? true : false} helperText={errors.name} />
            </Item>
            <Item item xs={12}>
              <TextField name="pickupAddress" label="Pickup Address" variant="outlined" required fullWidth onChange={handleChange} error={errors.pickupAddress ? true : false} helperText={errors.pickupAddress} />
            </Item>
            <Item item xs={12}>
              <TextField name="email" label="Email" variant="outlined" required fullWidth onChange={handleChange} error={errors.email ? true : false} helperText={errors.email} />
            </Item>
            <Item item xs={12}>
              <TextField name="phone" label="Phone" variant="outlined" required fullWidth onChange={handleChange} error={errors.phone ? true : false} helperText={errors.phone} />
            </Item>
            <Item item xs={12}>
            <TextField
  name="items"
  label="Items (separated by commas)"
  variant="outlined"
  required
  fullWidth
  multiline
  rows={4}
  value={preFilledItems}
  onChange={handleChange}
  error={errors.items ? true : false}
  helperText={errors.items}
/>
            </Item>
            <Item item xs={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <DatePicker label="Pickup Date" value={values.pickupDate} onChange={handleDateChange} renderInput={(params) => <TextField {...params} helperText={null} required />} error={errors.pickupDate ? true : false} helperText={errors.pickupDate} />
                <TimePicker label="Pickup Time" value={values.pickupTime} onChange={handleTimeChange} renderInput={(params) => <TextField {...params} helperText={null} required />} error={errors.pickupTime ? true : false} helperText={errors.pickupTime} />
              </Stack>
            </Item>
            <Item item xs={12}>
              <TextField name="notes" label="Notes" variant="outlined" required fullWidth onChange={handleChange} error={errors.notes ? true : false} helperText={errors.notes} />
            </Item>
            <Item item xs={12}>
              <Button variant="contained" type="submit" fullWidth>
                Book a Collection
              </Button>
            </Item>
          </Grid>
        </form>
      </Box>
    </Container>
    </Box>
  );
};

export default BookingForm;
