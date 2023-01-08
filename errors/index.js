const AuthorizedError = require('./AuthorizedError');
const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');
const ValidationError = require('./ValidationError');

const messages = {
  app: {
    unauthorized: 'Необходима авторизация',
    noPage: 'Запрашиваемый ресурс не найден',
    notURL: 'Введите ссылку!',
    notEmail: 'Введите email!',
  },
  user: {
    alreadyExist: 'Пользователь с такой почтой уже существует',
    create: 'Переданы некорректные данные при создании пользователя',
    update: 'Переданы некорректные данные при обновлении профиля',
    notFound: 'Пользователь не найден',
    incorrect: 'Неправильный email или пароль',
    name: 'поле должно содержать от 2 до 30 символов!',
  },
  movie: {
    validation: 'Некорректные данные для фильма',
    notFound: 'Фильм с указанным _id не найден',
    deleted: 'Фильм успешно удалён',
    forbidden: 'Вы не можете удалть чужой фильм!',
  },
};

module.exports = {
  AuthorizedError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  messages,
};
