const sendSuccessResponse = ({ res, statusCode = 200, message = "", data = {} }) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data
  })
}

const sendErrorResponse = ({ res, statusCode = 500, message = "", error = {}, }) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error
  })
}