require('dotenv').config();

module.exports.corsOptions = {
  origin: [
    // 'https://movies.ukh.nomoredomains.work',
    // 'http://movies.ukh.nomoredomains.work',
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
