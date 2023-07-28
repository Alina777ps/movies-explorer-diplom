const bcrypt = require('bcryptjs');
const { getJwtToken } = require('../utils/jwt');

const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const SALT_ROUNDS = 10;

// возвращает информацию о пользователе (email и имя)
// GET /users/me
module.exports.getUser = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .then((users) => res.send(users))
    .catch(next);
};

// обновляет информацию о пользователе (email и имя)
// PATCH /users/me
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const { id } = req.user;
  User.findByIdAndUpdate(
    id,
    { name, email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь уже существует'));
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(
          'Переданы некорректные данные при обновлении профиля.',
        ));
      } else {
        next(err);
      }
    });
};

// регистрация
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => {
      const { id } = user;

      return res.status(201).send({
        name,
        email,
        id,
        message: 'Пользователь успешно создан',
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(
          'Переданы некорректные данные при создании пользователя.',
        ));
      } else {
        next(err);
      }
    });
};

// авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError('Неправильные почта или пароль');
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) throw new UnauthorizedError('Неправильные почта или пароль');
        const token = getJwtToken(user.id);
        return res.send({ token, message: 'Вы успешно авторизовались' });
      });
    })
    .catch(next);
};

/*
// GET /users/me - возвращает информацию о текущем пользователе
module.exports.getUserInfo = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(
          'Некорректные данные при поиске пользователя по _id',
        ));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(
          'Пользователь с данным _id не найден.',
        ));
      } else {
        next(err);
      }
    });
};

module.exports.getUserId = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(
          'getUserId Некорректные данные при поиске пользователя по _id',
        ));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(
          'Пользователь по указанному id не найден.',
        ));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me/avatar — обновляет аватар
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { id } = req.user;
  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail()
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(
          'Переданы некорректные данные при обновлении аватара.',
        ));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(
          'Пользователь с указанным _id не найден.',
        ));
      } else {
        next(err);
      }
    });
};
*/
