const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Es necesario un nombre para el producto."]
  },
  image: {
    type: String,
    default: "https://image.flaticon.com/icons/png/512/98/98017.png"
  },
  category: {
    type: String,
    required: [true, "Es necesaria una categoría para el producto"]
  },
  description: String,
  available: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    required: [true, "Es necesario indicar un precio"]
  }
},
{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
}
)

module.exports = model("Product", productSchema)