require('dotenv').config();

const auth = async (req, res, next) => {
  if (process.env.AUTH_KEY !== req.header('AUTH_KEY')) {
    return res.status(401).send({
      status: 'error',
      message: 'unauthorized',
    });
  }
  next();
};

module.exports = auth;
