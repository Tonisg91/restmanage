const router = require('express').Router()
const bcrypt = require('bcrypt')
const Admin = require('../models/Admin.model')
const Product = require('../models/Product.model')
const imageUploader = require('../configs/cloudinary.config')

router.post('/addproduct', (req, res, next) => {
  const { name, category, description, price, image, ingredients } = req.body

  const separatedIngredients = ingredients.split(',').map(word => word.trim())

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
      description,
      price,
      ingredients: separatedIngredients,
      image
    }, (err, newProduct) => {
      if (err) {
        res.status(500).json({message: "Ha ocurrido un error al crear el producto"})
        return
      }
      res.status(200).json(newProduct)
    })
  })
})

router.post('/editproduct', (req, res, next) => {
  const { name, category, description, price, image, ingredients, _id } = req.body
  const separatedIngredients = () => {
    if (typeof ingredients === 'string') {
      return ingredients.split(',').map(word => word.trim())
    }
    return ingredients
  }

  const productUpdated = {
    name,
    category,
    description,
    price,
    image,
    ingredients: separatedIngredients()
  }

  Product.findByIdAndUpdate(_id, productUpdated, (err, editedProduct) => {
    if (err) {
      res.status(500).json({ message: "Ha ocurrido un error al editar el producto" })
      return
    }
    res.status(200).json(editedProduct)
  })
})

router.post('/imageupload', imageUploader.single('image'), (req, res, next) => {
  if (req.file) {
    return res.status(200).json({ url: req.file.path })
  }
  res.status(500).json({message: 'Error al cargar la imagen.'})
})



module.exports = router