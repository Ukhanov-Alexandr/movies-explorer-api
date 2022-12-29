const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const AuthorizedError = require('../errors/AuthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    message: 'поле должно содержать от 2 до 30 символов!',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Введите email!',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizedError('Неправильный email или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizedError('Неправильный email или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
