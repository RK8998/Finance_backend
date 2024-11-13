require('dotenv').config();
require('./models');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const morgan = require('morgan');

const initialRoutes = require('./routes');

/**
 * @title constant definition
 */
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0';

/**
 * @title server setup
 */
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

/**
 * @title routes definition
*/
app.use('/api', initialRoutes);


/**
 * @title server listening
 */
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
})