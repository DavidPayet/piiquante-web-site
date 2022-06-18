const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/users')
const password = require('../middlewares/password')
const checkEmail = require('../middlewares/emailValidator')

router.post('/signup', password, checkEmail, userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router