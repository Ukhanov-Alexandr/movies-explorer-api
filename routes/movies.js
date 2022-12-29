const moviesRouter = require('express').Router();
const { idValidate, movieValidate } = require('../middlewares/celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', movieValidate, createMovie);
moviesRouter.delete('/:id', idValidate, deleteMovie);

module.exports = moviesRouter;
