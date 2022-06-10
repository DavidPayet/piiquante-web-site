const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  // Gestion des images
  const sauceObject = JSON.parse(req.body.sauce)
  // Supprime l'id du front
  delete sauceObject._id

  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    // Génère l'URL d'une image
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })

  // Enregistre le model dans la base de données
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error }))
}

exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    
    // Vérifie l'id de l'auteur du post
      if (sauce.userId !== req.auth.userId) {
        return res.status(401).json({ error: new Error('Requête non autorisée !') })
      }

      // MÀJ du fichier dans le dossier images en cas de modification unique de l'image de la sauce
      if (req.file) {
        Sauce.findOne({ _id: req.params.id })
          .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];

            fs.unlink(`images/${filename}`, (error) => {
              if (error) throw error
            })
          })
          .catch(error => res.status(400).json({ error }))
      }

      // MÀJ de la sauce
      const sauceObject = req.file ?
        {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

      Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié !' }))
        .catch(error => res.status(400).json({ error }))

    })
}

exports.deleteSauce = (req, res, next) => {
  // Vérifie que la sauce correspond bien à celle de l'utilisateur qui l'a posté
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (!sauce) {
        return res.status(404).json({ error: new Error('Sauce non trouvé !') })
      }
      if (sauce.userId !== req.auth.userId) {
        return res.status(401).json({ error: new Error('Requête non autorisée !') })
      }

      const filename = sauce.imageUrl.split('/images/')[1];

      fs.unlink(`images/${filename}`, () => {
        // Supprime la sauce sélectionnée
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
          .catch(error => res.status(400).json({ error }))

      })
    })
}

// Récupération d'une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }))
}

// Récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))
}