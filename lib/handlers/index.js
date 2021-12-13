const handleApiSuccess = (res, statusCode, message, data) => {
  return res.status(statusCode || 200).json({
    message,
    body: Array.isArray(data) ? [...data] : { ...data },
  });
};

const handleApiError = (res, statusCode, error) => {
  return res.status(statusCode || 500).json({
    error,
  });
};

class ErrorHandler extends Error {
  constructor(statusCode = 500, message = 'Произошла ошибка!', ...params) {
    super(...params);
    this.name = 'ModalError';
    this.statusCode = statusCode;
    this.message = message;
    this.date = Date.now();
  }
}

module.exports = { handleApiError, handleApiSuccess, ErrorHandler };
