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

module.exports = router