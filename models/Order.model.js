const { Schema, model } = require('mongoose')


const productListSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    qty: {
        type: Number
    }
}, {_id: false})


const orderSchema = new Schema({
        client: {
            type: Schema.Types.ObjectId,
            ref: 'Client'
        },
        amount: Number,
        easyId: String,
        productList: [productListSchema],
        inProgress: {
            type: Boolean,
            default: false
        },
        isFinished: {
            type: Boolean,
            default: false
        },
        date: String
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
)

module.exports = model('Order', orderSchema)