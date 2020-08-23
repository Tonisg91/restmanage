const router = require('express').Router()
const bcrypt = require('bcrypt')
const Admin = require('../models/Admin.model')
const Product = require('../models/Product.model')
const imageUploader = require('../configs/cloudinary.config')

router.post('/addproduct', (req, res, next) => {
  //TODO: Falta colocar la imagen

  const { name, category, description, price, image } = req.body

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
  console.log(req.body)
  const productToEdit = req.body._id

  Product.findByIdAndUpdate(productToEdit, req.body, (err, editedProduct) => {
    if (err) {
      res.status(500).json({ message: "Ha ocurrido un error al editar el producto" })
      return
    }
    res.status(200).json(editedProduct)
  })
})

router.post('/imageupload', imageUploader.single('image'), (req, res, next) => {
  if (req.file) {
    res.status(200).json({ url: req.file.path })
    return
  }

  res.status(400).json({message: 'Debes seleccionar una imagen.'})
})



module.exports = router