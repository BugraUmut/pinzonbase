const express = require('express')
const session = require('express-session')
// const hbs = require('express-handlebars')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const app = express()
const User = require('./models/user')

const indexRouter = require('./routes/index')
const sendDataRouter = require('./routes/sendData')
const projectRouter = require('./routes/project')
const apiRouter = require('./routes/api/api')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// app.engine('hbs', hbs({ extname: '.hbs' }))
// app.set('view engine', 'hbs')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: true
}))
app.use(express.urlencoded({ extended: false} ))
app.use(express.json())

// Passport.js
app.use(passport.initialize())
app.use(passport.session())

// Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

passport.serializeUser((id, done) => {
    done(null, id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use(new localStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if(err) return done(err)
        if(!user) return done(null, false, { message: 'Incorrect username.' })

        bcrypt.compare(password, user.password, (err, res) => {
            if(err) return done(err)

            if(res === false) return done(null, false, { message: 'Incorrect password.'})

            return done(null, user)
        })
    })
}))

// ROUTES
app.use('/', indexRouter)
app.use('/senddata/', sendDataRouter)
app.use('/project/', projectRouter)
app.use('/api/', apiRouter)

app.get('*', (req, res) => {
  res.status(404).render('404', { title: "Page Not Found" })
})

app.listen(process.env.PORT, () => {
    console.log('App listening')
})
