const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
        client: {
            type: Schema.Types.ObjectId,
            ref: 'Client'
        },
        products: [],
        inProgress: {
            type: Boolean,
            default: true
        },
        isFinished: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
)

module.exports = model('Order', orderSchema)