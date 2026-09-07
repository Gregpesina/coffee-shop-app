import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile } from '../types';

// Creates a login + a matching profile document in Firestore
// (users/{uid}) so we have a place to store reward points.
export async function signUp(name: string, email: string, password: string): Promise<UserProfile> {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const profile: UserProfile = {
    uid: credential.user.uid,
    name,
    email,
    rewardPoints: 0,
  };
  await setDoc(doc(db, 'users', credential.user.uid), profile);
  return profile;
}

export async function logIn(email: string, password: string): Promise<UserProfile> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const snapshot = await getDoc(doc(db, 'users', credential.user.uid));
  if (!snapshot.exists()) {
    throw new Error('No profile found for this account.');
  }
  return snapshot.data() as UserProfile;
}

export function logOut() {
  return firebaseSignOut(auth);
}
