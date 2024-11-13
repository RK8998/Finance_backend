const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.send(`<h1>Server is running successfully.</h1>`);
});

module.exports = router;