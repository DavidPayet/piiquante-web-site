const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const sauceCtrl = require('../controllers/sauces');
const likeCtrl = require('../controllers/like');
const multer = require('../middlewares/multer-config');

// Crée une sauce + auth de sécurité + multer pour les images
router.post('/', auth, multer, sauceCtrl.createSauce)
// Modifie une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce)
// Supprime une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce)
// Récupère une sauce par son id
router.get('/:id', auth, sauceCtrl.getOneSauce)
// Récupère toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces)
// Route pour les likes/dislikes
router.post('/:id/like', auth, likeCtrl.likeSauce)

module.exports = router;