const router = require('express').Router();
const auth = require('../middlewares/auth');

const authRouter = require('./signup');
const loginRouter = require('./signin');
const userRouter = require('./users');
const movieRouter = require('./movies');

// роуты, не требующие авторизации
router.post('/signup', authRouter);
router.post('/signin', loginRouter);

// роуты требующие авторизации
router.get('/signout', auth, (req, res) => {
  res.clearCookie('jwt').send({ message: 'Успешный выход' });
});
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

module.exports = router;
