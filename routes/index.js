const express = require('express')
const router = express.Router()
const passport = require('passport')
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

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

// Setup admin user. REMOVE THAT BEFORE PUBLISH
router.get('/setup', async (req, res) => {
    const exists = await User.exists({ username: 'admin' })

    if(exists) {
        console.log("ex")
        res.redirect('/login')
        return
    }

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)
        bcrypt.hash("pass", salt, (err, hash) => {
            if(err) return next(err)
            const newAdmin = new User({
                username: 'admin',
                password: hash
            })

            newAdmin.save()

            res.redirect('/login')
        })
    })
})

module.exports = router