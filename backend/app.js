require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');

const NotFoundError = require('./errors/NotFoundError');

const router = require('./routes/index');

const {
  PORT = 3000,
  BD = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

mongoose.connect(BD)
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

const app = express();

app.use(helmet());

app.use(bodyParser.json());

app.use(requestLogger);

app.use(cors);

app.use(limiter);

app.use(router);

app.use('/*', (req, res, next) => next(new NotFoundError('Страница не найдена.')));

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? `На сервере произошла ошибка ${err.name} ${err.code}`
        : message,
    });
});

app.listen(PORT, () => console.log(`Web app available at http://127.0.0.1:${PORT}`));
