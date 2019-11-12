const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

const apiAuth = require('./middlewares/apiAuth');
const { catchAll, notFound } = require('./middlewares/error');

// set env variables from .env
dotenv.config({ path: `${__dirname}/../.env` });

mongoose.set('useCreateIndex', true);
// connect to mongodb

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// import all of our models
require('./models/OilSpot');
require('./models/User');

const app = express();

// express middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// add routes
app.use('/api/v1', apiAuth(), require('./routes'));

// add errors middlewares
app.use(notFound);
app.use(catchAll);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`Service is running at http://localhost:${PORT}/api/v1`);
});
