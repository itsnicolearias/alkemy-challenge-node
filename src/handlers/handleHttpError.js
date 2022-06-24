const handleHttpError = (err, res) => {
    if (err.name === 'ValidationError') {
      res.status(422).json({
        code: 'VALIDATION_ERROR',
        message: err.message
      });
    } else if (err.name === 'CastError') {
      res.status(400).json({
        code: 'INVALID_ID',
        message: err.message
      });
    } else if (err.name === 'MongoError' && err.code === 11000) {
      res.status(400).json({
        code: 'DUPLICATE_ERROR',
        message: err.message
      });
    } else {
      res.status(500).json({
        code: 'SERVER_ERROR',
        message: 'Something went wrong'
      });
    }
  };
  
  module.exports = { handleHttpError };