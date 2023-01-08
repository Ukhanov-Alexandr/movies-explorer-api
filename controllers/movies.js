const Movie = require('../models/movie');
const {
  NotFoundError, ValidationError, ForbiddenError, messages,
} = require('../errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movieDocument) => {
      const movie = movieDocument.toObject();
      movie.owner = { _id: req.user._id };
      res.send(movie);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundError(messages.movie.notFound))
    .then((movie) => {
      const ownerId = req.user._id;
      if (movie.owner.toString() === ownerId.toString()) {
        return movie.delete().then(() => { res.json({ message: messages.movie.deleted }); });
      }
      throw new ForbiddenError(messages.movie.forbidden);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(messages.movie.validation));
        return;
      }
      next(err);
    });
};
