const sendSuccessResponse = ({
  res,
  status = 200,
  message = 'Operation successfully executed!',
  data = {},
}) => {
  return res.status(status).json({
    success: true,
    status,
    message,
    data,
  });
};

const sendErrorResponse = ({
  res,
  status = 500,
  message = 'Fail to execute operation!',
  error = {},
}) => {
  let errorMessage = message;
  if (error?.name === 'SequelizeUniqueConstraintError') {
    errorMessage = error.errors[0].message;
  }

  return res.status(status).json({
    success: false,
    status,
    message: errorMessage,
    error,
  });
};

module.exports = { sendSuccessResponse, sendErrorResponse };
