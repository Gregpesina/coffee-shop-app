import {
  doc,
  runTransaction,
  collection,
} from 'firebase/firestore';

import { db } from './firebase';

export interface Reward {
  id: string;
  name: string;
  points: number;
}

export async function redeemReward(
  userId: string,
  reward: Reward
) {
  const userRef = doc(db, 'users', userId);

  const rewardRef = doc(
    collection(db, 'users', userId, 'rewards')
  );

  await runTransaction(
    db,
    async (transaction) => {
      const userDoc = await transaction.get(userRef);

      if (!userDoc.exists()) {
        throw new Error('User profile not found.');
      }

      const currentPoints =
        userDoc.data().rewardPoints ?? 0;

      if (currentPoints < reward.points) {
        throw new Error(
          'Not enough points for this reward.'
        );
      }

      transaction.update(userRef, {
        rewardPoints:
          currentPoints - reward.points,
      });

      transaction.set(rewardRef, {
        rewardId: reward.id,
        name: reward.name,
        points: reward.points,
        status: 'available',
        redeemedAt: Date.now(),
      });
    }
  );

  return {
    id: rewardRef.id,
    rewardId: reward.id,
    name: reward.name,
    points: reward.points,
    status: 'available',
  };
}