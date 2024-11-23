const {
  sendErrorResponse,
  sendSuccessResponse,
} = require('../helper/response');
const DB = require('../models/index');
const _ = require('lodash');

const getUserList = async (req, res) => {
  try {
    const { page, rows } = req.query;

    const userList = await DB.user.findAndCountAll({
      where: {
        status: 'active',
      },
      limit: +rows,
      offset: (+page - 1) * +rows,
    });

    if (!_.isEmpty(userList)) {
      return sendSuccessResponse({
        res,
        status: 200,
        message: 'Users list fetched successfully.',
        data: userList,
      });
    }
  } catch (error) {
    return sendErrorResponse({ res, message: error?.message, error });
  }
};

module.exports = { getUserList };
