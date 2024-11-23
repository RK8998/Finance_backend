const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoute = require('./user');

router.get('/test', (req, res) => {
  res.send(`<h1>Server is running successfully.</h1>`);
});

router.use('/auth', authRoutes);
router.use('/user', userRoute);

module.exports = router;
