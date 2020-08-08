const { Schema, model } = require('mongoose')

const adminSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email obligatorio"],
    match: [/^\S+@\S+\.\S+$/, "Dirección de correo inválida"],
    unique: true,
    lowercase: true,
    trim: true
  },
  adminPermissions: {
    type: Boolean,
    default: true
  },
  name: String,
  passwordHash: {
    type: String,
    required: [true, "Contraseña obligatoria"]
  },
  address: {
    city: String,
    street: String,
    number: String
  }
},
{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
}
)

module.exports = model("Admin", adminSchema)