const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длинна 2 символа'],
      maxlength: [30, 'Максимальная длинна 30 символов'],
    },
    email: {
      type: String,
      required: [true, 'Введите email'],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: [true, 'Введите пароль'],
      select: false, // чтобы API не возвращал хеш пароля
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
