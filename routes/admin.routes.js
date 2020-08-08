const router = require('express').Router()
const bcrypt = require('bcrypt')
const Admin = require('../models/Admin.model')
const Product = require('../models/Product.model')
//const passport = require('passport')

router.post('/signup', (req, res, next) => {
  const {email, password } = req.body
  
  if (!email || !password) {
    res.status(400).json({message: "Email y contraseña son necesarios."})
    return
  }
  
  if (password.length < 6) {
    res.status(400).json({message: "La contraseña debe incluir al menos 6 caracteres."})
    return
  }

  
  Admin.findOne({email}, (err, foundUser) => {
    if(err) {
      res.status(500).json({message: "La busqueda de usuario en /signup ha fallado."})
      return
    }
    if(foundUser) {
      res.status(400).json({message: "El usuario ya existe."})
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    
    Admin.create({
      email,
      passwordHash
    }, (err, newAdmin) => {
      if (err) {
        res.status(500).json({message: "Error al crear el usuario Admin"})
      }
      req.login(newAdmin, (err) => {
        if (err) {
          res.status(500).json({message: "El login despues de signup ha fallado"})
          return
        }
        res.status(200).json(newAdmin)
      })
    })
  })
})

router.post('/addproduct', (req, res, next) => {
  const {name, category, description} = req.body

  Product.findOne({name}, (err, foundProduct) => {
    if (err) {
      res.status(500).json({message: "Ha ocurrido un error al buscar el producto"})
      return
    }
    if (foundProduct) {
      res.status(400).json({message: "Ya hay un producto con este nombre."})
      return
    }
    Product.create({
      name,
      category,
      description
    }, (err, newProduct) => {
      if (err) {
        res.status(500).json({message: "Ha ocurrido un error al crear el producto"})
        return
      }
      res.status(200).json(newProduct)
    })
  })



})

module.exports = router