// Firebase setup. Create a free project at https://console.firebase.google.com,
// enable Authentication (Email/Password) and Firestore Database, then paste
// your project's config below. Never commit real keys to a public repo --
// use a .env file with something like react-native-dotenv for production.

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC9yHkpfNWTanDzDFGy_5tSPHxnogk1z4A',
  authDomain: 'coffee-app-2a041.firebaseapp.com',
  projectId: 'coffee-app-2a041',
  storageBucket: 'coffee-app-2a041.firebasestorage.app',
  messagingSenderId: '126343670175',
  appId: '1:126343670175:web:00420e9ae175e30b4235aa',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);