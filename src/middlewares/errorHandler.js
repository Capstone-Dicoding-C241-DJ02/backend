import APIError from '../utils/APIError.js';

const errorHandler = (err, _, res, next) => {
  if (!err) return next();

  if (err instanceof APIError) {
    return res.status(err.status).json({message: err.message});
  }

  return res.status(500).json({message: 'Internal Server Error'});
};

export default errorHandler;
