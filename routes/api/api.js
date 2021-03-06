const express = require('express')
const router = express.Router()
const Controller = require('../../controllers/api')
const {isLoggedIn} = require('../../controllers/index')

router.get('/', Controller.apiGET)

router.get('/update', Controller.apiGET)
router.post('/update', Controller.apiPOST)

module.exports = router
