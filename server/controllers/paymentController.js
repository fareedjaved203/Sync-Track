const stripe = require("stripe")(process.env.STRIPE_SECRET);

const postPayment = async (req, res) => {
  try {
    const amount = 500; // $5.00
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const amount = 500; // $5.00
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method: req.body.paymentMethodId,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  confirmPayment,
  postPayment,
};
