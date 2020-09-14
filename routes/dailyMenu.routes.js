const router = require('express').Router()
const DailyMenu = require('../models/DailyMenu.model')

router.post('/updatedailymenu', async (req, res, next) => {
    console.log(req.body)
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
            console.log(newDailyMenu)
            return res.status(200).json(newDailyMenu)
        }

        const updatedDailyMenu = await DailyMenu.findByIdAndUpdate(existentDailyMenu._id, {
            startes,
            mains,
            desserts,
            withCoffee,
            withBread,
            price,
        }, { new: true })

        console.log(updatedDailyMenu)
        return res.status(200).json(updatedDailyMenu)
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar los datos del menú diario." })
    }
})

router.get('getdailymenu', async (req, res, next) => {
    try {
        const currentDailyMenu = await DailyMenu.find()
        if (!currentDailyMenu) return res.status(200).json(null)

        return res.status(200).json(currentDailyMenu[0])
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el menú diario." })
    }
})

module.exports = router