const Admin = require('../models/Admin.model')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const passport = require('passport')

passport.serializeUser((loggedInUSer, cb) => {
    cb(null, loggedInUSer._id)
})

passport.deserializeUser((userIdFromSession, cb) => {
    Admin.findById(userIdFromSession, (err, userDocument) => {
        if (err) {
            cb(err)
            return
        }
        cb(null, userDocument)
    })
})

passport.use(new LocalStrategy((username, password, next) => {
    Admin.findOne({username}, (err, foundUser) => {
        if (err) {
            next(err)
            return
        }

        if(!foundUser) {
            next(null, false, { message: "Incorrect username."})
            return
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
            next(null, false, {message: "Wrong password"})
            return
        }

        next(null,foundUser)
    })
}))