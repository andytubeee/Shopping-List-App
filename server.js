const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/API/items');

const app = express();

// Body-parser Middleware
app.use(bodyParser.json());

// DB Init
const db = require('./config/keys').mongoURI;

// Connect to DB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Database is Successfully Connected!'))
  .catch((err) => console.log('Error: ' + err));

// Use routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
