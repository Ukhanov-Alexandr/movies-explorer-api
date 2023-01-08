const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const defaultErrorHandler = require('./errors/defaultErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOptions, PORT, DB_URL } = require('./utils/constants');
const routes = require('./routes/index');

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(DB_URL)
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
