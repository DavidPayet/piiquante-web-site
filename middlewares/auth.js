require('dotenv').config();

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;
    // Pour éviter les problèmes de sécurité dans notre route "delete"
    req.auth = { userId };

    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable !'
    } else {
      next()
    }

  } catch {
    res.status(401).json({ error: new Error('Requête non authentifiée !') })
  }
}