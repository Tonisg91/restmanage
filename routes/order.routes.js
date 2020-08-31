require('dotenv').config
const router = require('express').Router()
const Client = require('../models/Client.model')
const Order = require('../models/Order.model')
const date = require('../tools/dateService').MMDD()

router.post('/generateorder', async (req, res, next) => {
    try {
        const { client, products, amount } = req.body
        const productList = products.map(({product, qty}) => {
            return {
                product: product._id,
                qty
            }
        })
        const easyId = `${date}${await Order.countDocuments()}`
        const timeStamps = {
            time: `${new Date().toLocaleTimeString()}`,
            date: `${new Date().toLocaleDateString()}`
        }

        const newOrder = await Order.create({
            productList, 
            client, 
            easyId,
            amount,
            timeStamps
        })
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
        const ordersList = await Order.find().populate('client').populate('products.products')
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

router.post('/finishorder/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params
        const finishedOrder = await Order.findByIdAndUpdate(orderId, { isFinished: true, inProgress: false }, { new: true })
        res.status(200).json(finishedOrder)
    } catch (error) {
        res.status(500).json({ message: 'Error al finalizar el pedido.' })
    }
})

module.exports = router