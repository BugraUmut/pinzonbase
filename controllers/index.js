const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Project = require('../models/project')

function registerGET(req, res) {
    let response = {
        title: "Register",
        error: req.query.error
    }
    res.render('register', response)
}

async function registerPOST(req, res) {
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
}

function loginGET(req, res) {
    let response = {
        title: "Login",
        error: req.query.error
    }
    res.render('login', response)
}

function loginPOST(req, res) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login?error=true'
    })(req, res)
}

function logout(req, res) {
    req.logout()
    res.redirect('/')
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.redirect('/login')
}

function isLoggedOut(req, res, next) {
    if(!req.isAuthenticated()) return next()
    res.redirect('/')
}

async function indexGET(req, res) {
    await Project.find({id: req.user.id}, (err, docs) => {
        if(err) return console.log(err)

        res.render('index' , { title: "Home", username: req.user.username, projects: docs })
    })
}
module.exports = {
    registerPOST,
    registerGET,
    isLoggedIn,
    isLoggedOut,
    loginGET,
    loginPOST,
    logout,
    indexGET
}
