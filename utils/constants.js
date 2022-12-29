module.exports.corsOptions = {
  origin: [
    // 'https://mesto.front.ukh.nomoredomains.club',
    // 'http://mesto.front.ukh.nomoredomains.club',
    'http://localhost:3000',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};
