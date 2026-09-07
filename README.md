# Coffee Shop App

A React Native (Expo) app for iOS + Android: browse the menu, order, pay with
Stripe, and earn reward points.

## How the pieces fit together

```
App.tsx                  <- entry point, loads fonts, wraps everything
src/
  theme/                 <- colors + fonts (change these to re-brand the app)
  types/                 <- shape of a MenuItem, Order, etc.
  services/
    firebase.ts           <- connects to your Firebase project
    authService.ts         <- sign up / log in / log out
    menuData.ts             <- sample menu (swap for Firestore later)
    orderService.ts          <- totals, points, saving orders
    stripeService.ts          <- talks to the backend function below
  context/                <- app-wide state (who's logged in, what's in the cart)
  components/             <- small reusable pieces (buttons, cards)
  screens/                <- one file per screen
  navigation/              <- wires screens together (tabs + stacks)
backend-function/
  index.js                <- the ONE backend file, explained below
```

## 1. Install and run

You'll need [Node.js](https://nodejs.org) and the Expo Go app on your phone
(free, from the App Store / Play Store).

```bash
cd coffee-app
npm install
npm start
```

Scan the QR code that appears with your phone's camera (iOS) or the Expo Go
app (Android). The app will open on your phone. It'll run, but login/signup
and payment won't work yet -- that needs the setup below.

## 2. Set up Firebase (auth + database) -- free

1. Go to https://console.firebase.google.com -> Create a project.
2. In the project, go to **Build > Authentication > Get started**, enable
   **Email/Password**.
3. Go to **Build > Firestore Database > Create database** (start in test
   mode for now).
4. Go to **Project settings > General**, scroll to "Your apps", click the
   web icon (`</>`) to register a web app -- you'll get a config object.
5. Paste those values into `src/services/firebase.ts`.

Now signup/login will work, and each order will be saved to Firestore under
an `orders` collection, with reward points tracked on each user's document.

## 3. Set up Stripe (payments)

Payments need a tiny backend, because your Stripe *secret* key can never sit
inside the mobile app itself (anyone could pull it out and use it).

1. Create a free account at https://dashboard.stripe.com -- stay in **test
   mode** while developing.
2. Grab your **Publishable key** and **Secret key** from
   Developers > API keys.
3. Deploy the backend function:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init functions      # choose your existing Firebase project
   # copy backend-function/index.js into the generated functions/index.js
   cd functions && npm install stripe && cd ..
   firebase functions:config:set stripe.secret="sk_test_..."
   firebase deploy --only functions
   ```
4. Firebase will print a URL like
   `https://us-central1-yourproject.cloudfunctions.net/createPaymentIntent`.
   Paste it into `CREATE_PAYMENT_INTENT_URL` in `src/services/stripeService.ts`.
5. Paste your **publishable** key into `STRIPE_PUBLISHABLE_KEY` in `App.tsx`.

Test card number for checkout: `4242 4242 4242 4242`, any future expiry, any CVC.

## 4. What to build next, in order

1. Get login/signup working end to end (step 2 above).
2. Move `MENU_ITEMS` from `menuData.ts` into a Firestore `menuItems`
   collection, so you can update the menu without shipping a new app.
3. Get payments working (step 3 above).
4. Add an order-history screen reading from the `orders` collection.
5. When ready for real users: switch Stripe out of test mode, tighten
   Firestore security rules (test mode allows anyone to read/write), and
   look into Expo's build service (`eas build`) to submit to the App
   Store / Play Store.

## Why this structure

Everything is split so each file does one job -- a `service` talks to the
outside world (Firebase, Stripe), a `context` holds shared state, a
`screen` is one visual page, and `components` are the reusable pieces
screens are built from. When something's broken, that split tells you
where to look: wrong data on screen -> check the service; button doesn't
update the UI -> check the context; layout looks off -> check the screen
or component.
