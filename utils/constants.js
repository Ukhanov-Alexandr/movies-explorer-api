require('dotenv').config();

module.exports.corsOptions = {
  origin: [
    // 'https://mesto.front.ukh.nomoredomains.club',
    // 'http://mesto.front.ukh.nomoredomains.club',
    'http://localhost:3001',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};

module.exports.rateLimitOptions = {
  message: 'Слишком много запросов',
  max: 100,
};

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/moviesdblocal' } = process.env;
module.exports = { PORT, DB_URL };
