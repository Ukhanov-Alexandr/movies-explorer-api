const { celebrate, Joi } = require('celebrate');

const urlCheck = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
const linkValidation = (value, helper) => {
  if (!urlCheck.test(value)) {
    return helper.message('Введите ссылку!');
  }
  return value;
};

module.exports.signupValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.idValidate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

module.exports.userProfileValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

// ------------------movie-------------------

module.exports.movieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required().min(2).max(300),
    image: Joi.string().required().custom(linkValidation),
    trailerLink: Joi.string().required().custom(linkValidation),
    thumbnail: Joi.string().required().custom(linkValidation),
    movieId: Joi.number().required().min(1),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
});
