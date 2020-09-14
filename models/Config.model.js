const { Schema, model } = require('mongoose')

const configSchema = new Schema({
    name: {
        type: String,
        default: 'Nombre del restaurante'
    },
    logo: String,
    ticketLogo: String,
    phone: String,
    email: String,
    street: String,
    number: String,
    city: String,
})

module.exports = model("Config", configSchema)