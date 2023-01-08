require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'some-secret-key' } = process.env;
const { AuthorizedError, messages } = require('../errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizedError(messages.app.unauthorized);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthorizedError(messages.app.unauthorized));
    return;
  }

  req.user = payload;
  next();
};
