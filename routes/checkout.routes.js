const app = require('../app')

const router = require('express').Router()
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET)

router.post('/checkout', async (req, res, next) => {
    console.log(req.body)
    const { id, amount, description } = req.body

    const payment = await stripe.paymentIntents.create({
        amount,
        currency: 'EUR',
        description,
        payment_method: id,
        confirm: true
    })

    console.log(payment)

    res.send({message: 'Succesfull payment'})
})

module.exports = router