const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movieDocument) => {
      const movie = movieDocument.toObject();
      movie.owner = { _id: req.user._id };
      res.send(movie);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundError('Фильм с указанным _id не найден'))
    .then((movie) => {
      const ownerId = req.user._id;
      if (movie.owner.toString() === ownerId.toString()) {
        return movie.delete().then(() => { res.json({ message: `Фильм ${movie._id} - успешно удалён` }); });
      }
      throw new ForbiddenError('Вы не можете удалть чужой фильм!');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные при удалении фильма'));
        return;
      }
      next(err);
    });
};
