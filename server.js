// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Booking = require('./models/Booking'); // assuming you have a Booking model defined

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ppranathi:Pratap12@cluster0.n8gwy3h.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/api/bookings', (req, res) => {
  const newBooking = new Booking({
    name: req.body.name,
    address: req.body.address,
    date: req.body.date
  });

  newBooking.save((err, booking) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(booking);
  });
});

 app.listen(3000, () => console.log('Server listening on port 3001'));
