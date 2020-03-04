const statusRes = {
  200: 'success',
  401: 'Authentication error',
  201: 'success',
  400: 'error',
  403: 'error, not allowed',
  404: 'Error, not found'
};

const errorResponse = (res, status, message) => {
  res.status(status).json({ status, error: message });
};

const successResposnse = (res, status, message = null, payload = null) => {
  res.status(status).json({
    status: statusRes[status],
    data: {
      message,
      ...payload
    }
  });
};

const successResponseArray = (res, status, arrayData) => {
  const response = {
    status: statusRes[status],
    data: arrayData
  };
  res.status(status).json(response);
};

export { errorResponse, successResposnse, successResponseArray };
