const passwordValidator = require('password-validator')

const passwordSchema = new passwordValidator()

// Le mot de passe doit contenir entre 5 et 50 caractères, des lettres minuscules et majuscules, au moins 2 chiffres, sans espaces et ne doit pas être les mots en ligne 13
passwordSchema
  .is().min(5)
  .is().max(50)
  .has().uppercase()
  .has().lowercase()
  .has().digits(2)
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = (req, res, next) => {
  passwordSchema.validate(req.body.password) ? next() : res.status(400).json({ error: `Mot de passe trop faible : ${passwordSchema.validate(req.body.password, { list: true })}` })
}