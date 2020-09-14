const { Schema, model } = require('mongoose')

const dailyMenuSchema = new Schema({
    starters: [String],
    mains: [String],
    desserts: [String],
    withCoffee: Boolean,
    withBread: Boolean,
    price: Number
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }

)

module.exports = model("DailyMenu", dailyMenuSchema)