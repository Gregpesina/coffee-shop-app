const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const Stripe = require("stripe");

const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");

exports.createPaymentIntent = onRequest(
  {
    secrets: [stripeSecretKey],
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "POST");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      return res.status(204).send("");
    }

    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Method not allowed",
      });
    }

    try {
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({
          error: "Invalid amount",
        });
      }

      const stripe = Stripe(stripeSecretKey.value());

      const paymentIntent =
        await stripe.paymentIntents.create({
          amount: Math.round(amount),
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
        });

      return res.json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Could not create payment intent",
      });
    }
  }
);