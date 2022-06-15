const Sauce = require('../models/Sauce');

exports.likeSauce = (req, res, next) => {

  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {

      // Si userId n'est pas dans le tableau usersLiked et que like = 1
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        Sauce.updateOne({ _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId }
          })
          .then(() => res.status(201).json({ message: 'like +1' }))
          .catch(error => res.status(400).json({ error }))
      }

      // Si userId est dans le tableau usersLiked et que like = 0
      if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        Sauce.updateOne({ _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId }
          })
          .then(() => res.status(201).json({ message: 'like -1' }))
          .catch(error => res.status(400).json({ error }))
      }

      // Si userId n'est pas dans le tableau usersDisliked et que dislike = 1
      if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
        Sauce.updateOne({ _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId }
          })
          .then(() => res.status(201).json({ message: 'dislike +1' }))
          .catch(error => res.status(400).json({ error }))
      }

      // Si userId est dans le tableau usersDisliked et que dislike = 0
      if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
        Sauce.updateOne({ _id: req.params.id },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId }
          })
          .then(() => res.status(201).json({ message: 'dislike -1' }))
          .catch(error => res.status(400).json({ error }))
      }

    })
    .catch(error => res.status(404).json({ error }))

}