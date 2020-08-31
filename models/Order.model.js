const { Schema, model } = require('mongoose')


const productListSchema = new Schema({
    product: {
        _id: false,
        type: Schema.Types.ObjectId,
        ref: 'Products'
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
            default: true
        },
        isFinished: {
            type: Boolean,
            default: false
        },
        timeStamps: { 
            time: String,
            date: String
        }
    }
)

module.exports = model('Order', orderSchema)