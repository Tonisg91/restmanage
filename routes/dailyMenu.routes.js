const router = require('express').Router()
const DailyMenu = require('../models/DailyMenu.model')

router.post('/updatedailymenu', async (req, res, next) => {
    const { starters, mains, desserts, withCoffee, withBread, price, _id } = req.body

    try {
        const existentDailyMenu = _id ? await DailyMenu.findById(_id) : null
        if (!existentDailyMenu) {
            const newDailyMenu = await DailyMenu.create({
                starters,
                mains,
                desserts,
                withCoffee,
                withBread,
                price
            })
            return res.status(200).json(newDailyMenu)
        }

        const updatedDailyMenu = await DailyMenu.findByIdAndUpdate(_id, req.body, { new: true })

        return res.status(200).json(updatedDailyMenu)
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar los datos del menú diario." })
    }
})

router.get('/getdailymenu', async (req, res, next) => {
    try {
        const currentDailyMenu = await DailyMenu.find()
        if (!currentDailyMenu) return res.status(200).json(null)

        return res.status(200).json(currentDailyMenu[0])
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el menú diario." })
    }
})

module.exports = router