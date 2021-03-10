const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.log('Error connecting to Mongo : ', err);
  });

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

fs.readdirSync('./routes').map((route) =>
  app.use('/api', require('./routes/' + route))
);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Listening to port :', port);
});
