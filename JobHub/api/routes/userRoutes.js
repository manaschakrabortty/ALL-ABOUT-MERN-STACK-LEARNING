const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.route('/register').post(userController.register)
router.route('/login').post(userController.login)
router.route('/logout').post(userController.logout)
router.route('/profile').get(userController.profile)
router.route('/sendOTP').post(userController.sendOTP)
router.route('/verifyOTP').post(userController.verifyOTP)
router.route('/sendResetPassMail').post(userController.sendResetPassMail)
router.route('/resetPassword').put(userController.resetPassword)


module.exports = router