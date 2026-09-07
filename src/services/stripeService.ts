// IMPORTANT: Stripe secret keys can never live in the mobile app -- anyone
// could extract them and charge cards themselves. Payments always need a
// tiny backend endpoint that creates a "PaymentIntent" using your SECRET
// key, and the app only ever sees a short-lived "client secret" back.
//
// The easiest beginner-friendly option: a single Firebase Cloud Function.
// See README.md -> "Setting up payments" for the ~15 lines of backend code
// and how to deploy it. Once deployed, put its URL below.

const CREATE_PAYMENT_INTENT_URL = 'https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/createPaymentIntent';

export async function fetchPaymentIntentClientSecret(amountInDollars: number): Promise<string> {
  const response = await fetch(CREATE_PAYMENT_INTENT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: Math.round(amountInDollars * 100) }), // Stripe uses cents
  });

  if (!response.ok) {
    throw new Error('Could not start payment. Please try again.');
  }

  const { clientSecret } = await response.json();
  return clientSecret;
}
