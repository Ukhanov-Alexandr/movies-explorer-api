const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { AuthorizedError, messages } = require('../errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    message: messages.user.name,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: messages.app.notEmail,
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
        return Promise.reject(new AuthorizedError(messages.user.incorrect));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizedError(messages.user.incorrect));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
