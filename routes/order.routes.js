require('dotenv').config
const router = require('express').Router()
const Client = require('../models/Client.model')
const Order = require('../models/Order.model')
const date = require('../tools/dateService')

router.post('/generateorder', async (req, res, next) => {
    try {
        const { client, products, amount, email } = req.body
        const productList = products.map(({product, qty}) => {
            return {
                product: product._id,
                qty
            }
        })
        const easyId = `${date.MMDD()}${await Order.countDocuments({date: date.MMDD()})}`
        const newOrder = await Order.create({
            productList, 
            client, 
            easyId,
            amount,
            date: date.MMDD()
        })

        if (client) await Client.findByIdAndUpdate(client,{ $push: { orders: newOrder._id}})

        return res.status(200).json(newOrder)
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el pedido.'})
    }
})

router.get('/getsingleorder/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        console.log(id)
        const orderFounded = await Order.findById(id).populate('client').populate('productList.product')

        if (!orderFounded) return res.status(400).json({message: "No se encuentra el pedido."})

        return res.status(200).json(orderFounded)
    } catch (error) {
        res.status(500).json({message: "Error al buscar el pedido."})
    }
})


router.get('/getallorders', async (req, res, next) => {
    try {
        const ordersList = await Order.find().populate('client').populate('productList.product')
        res.status(200).json(ordersList)
        return
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los pedidos.'})
    }
})

router.get('/getincomingorders', async (req, res, next) => {
    try {
        const incomingOrders = await Order.find({
                inProgress: false, 
                isFinished: false
            }).populate('client').populate('productList.product')
        if (!incomingOrders) {
            res.status(400).json({message: 'No hay pedidos entrantes.'})
            return
        }
        res.status(200).json(incomingOrders)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los pedidos entrantes.'})
    }
})

router.get('/getordersinprogress', async (req, res, next) => {
    try {
        const finishedOrders = await Order.find({ inProgress: true }).populate('client').populate('productList.product')
        if (!finishedOrders) {
            res.status(400).json({ message: 'No hay pedidos en curso.' })
            return
        }
        res.status(200).json(finishedOrders)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pedidos en curso.' })
    }
})

router.post('/startorder/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params
        const startedOrder = await Order.findByIdAndUpdate(orderId, {inProgress: true}, {new: true})
        res.status(200).json(startedOrder)
    } catch (error) {
        res.status(500).json({message: "Error al iniciar el pedido."})
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