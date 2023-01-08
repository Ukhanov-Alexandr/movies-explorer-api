// libs
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
// modules
const defaultErrorHandler = require('./errors/defaultErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  corsOptions, rateLimitOptions, PORT, DB_URL,
} = require('./utils/constants');
const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(rateLimit(rateLimitOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function connectToDb() {
  try {
    await mongoose.connect(DB_URL);
    console.log('«Database connected successfully»');
  } catch (err) {
    console.log(err, '«Database connection failed»');
  }
}

connectToDb();

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
