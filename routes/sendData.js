const express = require('express')
const router = express.Router()
const Controller = require('../controllers/sendData')

router.get('/', (req, res) => {
    res.send(req.body.dataSent)
})
router.post('/', (req, res) => { console.log(req) })

module.exports = router
