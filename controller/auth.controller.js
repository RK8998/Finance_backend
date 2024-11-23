const Joi = require('joi');
const DB = require('../models/index');
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require('../helper/response');
const {
  getBcryptPassword,
  comparePassword,
  generateJWTToken,
} = require('../helper/auth');
const _ = require('lodash');

const login = async (req, res) => {
  try {
    const data = req.body;
    const schema = Joi.object().keys({
      email: Joi.string().email().required(), // email is required
      password: Joi.string().required(), // password is required
    });

    const value = await schema.validateAsync(data);
    const userData = await DB.user.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
        include: ['password'],
      },
      where: {
        email: value.email,
      },
    });

    if (!userData || _.isEmpty(userData)) {
      return sendErrorResponse({
        res,
        status: 404,
        message: 'User not found with this email address.',
      });
    }

    if (userData.status !== 'active') {
      return sendErrorResponse({
        res,
        status: 401,
        message: 'User is not active.',
      });
    }

    const user = userData.toJSON();

    const isPasswordMatch = await comparePassword(
      value.password,
      user.password
    );
    if (isPasswordMatch) {
      delete user.password;
      const token = generateJWTToken({ ...user });

      return sendSuccessResponse({
        res,
        status: 200,
        message: 'Login successfully.',
        data: { token, user },
      });
    }

    return sendErrorResponse({
      res,
      status: 401,
      message: 'Invalid password.',
    });
  } catch (error) {
    return sendErrorResponse({ res, message: error?.message, error });
  }
};

const register = async (req, res) => {
  try {
    const data = req.body;
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email(),
      phone: Joi.string().required(),
      password: Joi.string().min(8).required(),
    });

    const value = await schema.validateAsync(data);

    // fetch the user based on email address
    const existUser = await DB.user.findOne({
      where: {
        email: value.email,
      },
    });

    // check the user is exist or not in the system. || response with error if exist.
    if (existUser) {
      return sendErrorResponse({
        res,
        status: 400,
        message: 'User is already exist with same email address!',
      });
    }

    if (_.has(value, 'password')) {
      value.password = getBcryptPassword(value.password);
    }

    const user = await DB.user.create(value);

    if (user) {
      const data = user.toJSON();
      delete data.password;

      return sendSuccessResponse({
        res,
        status: 201,
        message: 'Registration successfully!',
        data: data,
      });
    }
  } catch (error) {
    return sendErrorResponse({ res, message: error?.message, error });
  }
};

module.exports = { login, register };
