const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = () => {

    const paymentIntent = async () => {
        const intent = await stripe.paymentIntents.create({
            amount: 2000,
            currency: 'aud'
        });   

        return {
            statusCode: 200,
            body: JSON.stringify({clientSecret: intent.client_secret})
        }
    }

    return paymentIntent();
}