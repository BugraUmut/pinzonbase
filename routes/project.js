const express = require('express')
const router = express.Router()
const Controller = require('../controllers/project')
const {isLoggedIn} = require('../controllers/index')

router.get('/', isLoggedIn, Controller.indexGET)

router.get('/new', isLoggedIn, Controller.createProjectGET)
router.post('/new', isLoggedIn, Controller.createProjectPOST)

router.get('/data/:projectId', isLoggedIn, Controller.dataGET)

module.exports = router