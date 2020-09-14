const { Schema, model } = require('mongoose')

const dailyMenuSchema = new Schema({
    starters: [String],
    mains: [String],
    desserts: [String],
    withCoffee: Boolean,
    withBread: Boolean,
    price: Number
})

module.exports = model("DailyMenu", dailyMenuSchema)