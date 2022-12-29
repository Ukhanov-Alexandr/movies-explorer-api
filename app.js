const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const defaultErrorHandler = require('./errors/defaultErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOptions } = require('./utils/constants');
const routes = require('./routes/index');

const { PORT = 3001 } = process.env;
const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/bitfilmsdb')
  .then(() => console.log('«Соединение с базой данных успешно»'))
  .catch((err) => console.log(err, '«Ошибка подключения к базе данных»'));
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
