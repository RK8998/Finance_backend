const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);

const getBcryptPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const generateJWTToken = (data) => {
  const token = jwt.sign({ ...data }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRE_TIME,
  });
  return token;
};

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Password comparison failed.');
  }
};

module.exports = { getBcryptPassword, generateJWTToken, comparePassword };
