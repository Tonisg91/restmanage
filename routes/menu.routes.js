const router = require('express').Router()
const Product = require('../models/Product.model')

router.get('/menu', (req, res, next) => {
  Product.find({}, (err, productList) => {
    if (err) {
      res.status(500).json({message: "Ha ocurrido un error al buscar los productos"})
      return
    }
    if (!productList) {
      res.status(200).json({message: "Aun no hay platos disponibles"})
      return
    }
    res.status(200).json(productList)
  })
})

router.get('/product/:id', (req, res, next) => {
  const { id } = req.params
  Product.findById(id, (err, product) => {
    if (err) {
      res.status(500).json({message: "Ha ocurrido un error al buscar el producto."})
      return
    }
    if (!product) {
      res.status(400).json({message: "No se encuentra el producto en la base de datos."})
      return
    }
    res.status(200).json(product)
  })
})

module.exports = router