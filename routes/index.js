const express = require('express')
const router = express.Router()
const Controller = require('../controllers/index')

router.get('/', Controller.isLoggedIn, Controller.indexGET)
//router.post('/')

router.get('/login', Controller.isLoggedOut, Controller.loginGET)
router.post('/login', (req, res) => Controller.loginPOST(req, res) )

router.get('/register', Controller.isLoggedOut, Controller.registerGET)
router.post('/register', Controller.registerPOST)

router.get('/logout', Controller.logout)

module.exports = router