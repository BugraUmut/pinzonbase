const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/user')

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.redirect('/login')
}

function isLoggedOut(req, res, next) {
    if(!req.isAuthenticated()) return next()
    res.redirect('/')
}

router.get('/', isLoggedIn, (req, res) => {
    res.render('index' , { title: "Home" })
})

router.get('/login', isLoggedOut, (req, res) => {
    let response = {
        title: "Login",
        error: req.query.error
    }
    res.render('login', response)
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?error=true'
}))

router.get('/register', isLoggedOut, (req, res) => {
    let response = {
        title: "Register",
        error: req.query.error
    }
    res.render('register', response)
})

router.post('/')

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

// Setup admin user. REMOVE THAT BEFORE PUBLISH
router.post('/register', async (req, res) => {
    const exists = await User.exists({ username: req.body.username })
    
    if(exists) {
        res.redirect('/register?error=true')
        return
    }

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) return next(err)
            const newAdmin = new User({
                username: req.body.username,
                password: hash
            })

            newAdmin.save()

            res.redirect('/login')
        })
    })
})

module.exports = router