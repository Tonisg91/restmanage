require('dotenv').config
const router = require('express').Router()
const Client = require('../models/Client.model')
const Order = require('../models/Order.model')

router.post('/generateorder', async (req, res, next) => {
    const { client } = req.body
    try {
        const newOrder = await Order.create(req.body)
        const newOrderId = newOrder._id
        if (client) {
            await Client.findByIdAndUpdate(client,{ $push: { orders: newOrderId}})
        }
        res.status(200).json(newOrder)
        return
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el pedido.'})
    }
})

router.get('/getallorders', async (req, res, next) => {
    try {
        const ordersList = await Order.find().populate('client').populate('products')
        res.status(200).json(ordersList)
        return
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los pedidos.'})
    }
})

router.get('/getactiveorders', async (req, res, next) => {
    try {
        const activeOrders = await Order.find({inProgress: true}).populate('client').populate('products')
        if (!activeOrders) {
            res.status(400).json({message: 'No hay pedidos pendientes.'})
            return
        }
        res.status(200).json(activeOrders)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los pedidos activos.'})
    }
})

router.post('/finishorder/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params
        const finishedOrder = await Order.findByIdAndUpdate(orderId, {isFinished: true, inProgress: false}, {new: true})
        res.status(200).json(finishedOrder)
    } catch (error) {
        res.status(500).json({message: 'Error al finalizar el pedido.'})
    }
})

router.get('/getfinishedorders', async (req, res, next) => {
    try {
        const finishedOrders = await Order.find({ isFinished: true }).populate('client').populate('products')
        if (!finishedOrders) {
            res.status(400).json({ message: 'No hay pedidos finalizados.' })
            return
        }
        res.status(200).json(finishedOrders)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pedidos finalizados.' })
    }
})

module.exports = router