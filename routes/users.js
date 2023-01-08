const usersRouter = require('express').Router();
const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');
const {
  userProfileValidate,
} = require('../middlewares/celebrate');

usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', userProfileValidate, updateUser);

module.exports = usersRouter;
