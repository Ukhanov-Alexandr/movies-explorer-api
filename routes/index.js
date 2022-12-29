const routes = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { signupValidate, loginValidate } = require('../middlewares/celebrate');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

// routes.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });
routes.post('/signup', signupValidate, createUser);
routes.post('/signin', loginValidate, login);
routes.use(auth);
routes.use('/users', usersRouter);
routes.use('/movies', moviesRouter);
routes.use('/*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

module.exports = routes;
