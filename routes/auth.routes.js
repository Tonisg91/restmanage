const router = require('express').Router()
const bcrypt = require('bcrypt')
const Admin = require('../models/Admin.model')
const Client = require('../models/Client.model')

router.post('/login' , (req, res, next) => {
    const {email, password} = req.body

    if (!email || !password) {
        res.status(400).json({message: 'Email y contraseña son necesarios.'})
        return
    }

    Client.findOne({email}, (err, foundClient) => {
        if (err) {
            res.status(500).json({message: 'La busqueda de usuario en /login ha fallado.'})
            return
        }
        if (foundClient) {
            const match = bcrypt.compareSync(password, foundClient.passwordHash)
    
            if (!match) {
                res.status(400).json({ message: 'La contraseña no coincide' })
                return
            }
            res.status(200).json(foundClient)
            return
        } else {
                Admin.findOne({ email }, (err, foundAdmin) => {
                    if (err) {
                        res.status(500).json({ message: 'La busqueda de usuario en /login ha fallado.' })
                        return
                    }
                    if (!foundAdmin) {
                        res.status(400).json({ message: 'El usuario no existe.' })
                        return
                    }
                    console.log(foundAdmin)
                    //const salt = bcrypt.genSaltSync()
                    const match = bcrypt.compareSync(password, foundAdmin.passwordHash)
                    
                    if (!match) {
                        res.status(400).json({ message: 'La contraseña no coincide' })
                        return
                    }
    
                    res.status(200).json(foundAdmin)
                    return
                })
        }
    })
})
// router.post('/admin/login', (req, res, next) => {
//     const { email, password } = req.body

//     if (!email || !password) {
//         res.status(400).json({ message: 'Email y contraseña son necesarios.' })
//         return
//     }

// })

module.exports = router