const router = require('express').Router()
const Config = require('../models/Config.model')

router.post('/updateconfig', async (req, res, next) => {
    const { name, logo, phone, email, street, number, city, _id, ticketLogo } = req.body

    try {
        const existentConfig = _id ? await Config.findById(_id) : null

        if (!existentConfig) {
            const newConfig = await Config.create({
                name,
                logo,
                ticketLogo,
                phone,
                email,
                street,
                number,
                city
            })
            return res.status(200).json(newConfig)
        }

        const updatedConfig = await Config.findByIdAndUpdate(existentConfig._id, {
            name,
            logo,
            ticketLogo,
            phone,
            email,
            street,
            number,
            city
        }, {new: true})

        return res.status(200).json(updatedConfig)

    } catch (error) {
        return res.status(500).json({message: "Error al actualizar los datos de configuración."})
    }
})

router.get('/getconfig', async (req, res, next) => {
    try {
        const currentConfig = await Config.find()
        if (!currentConfig) return res.status(200).json(null)

        return res.status(200).json(currentConfig[0])
    } catch (error) {
        return res.status(500).json({message: "Error al obtener la configuración."})
    }
})



module.exports = router