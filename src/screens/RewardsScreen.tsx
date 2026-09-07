import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';
import { useAuth } from '../context/AuthContext';

const REWARDS = [
  {
    id: 'free-croissant',
    name: 'Free Croissant',
    points: 50,
  },
  {
    id: 'free-food',
    name: 'Free Food Item',
    points: 100,
  },
  {
    id: 'free-drink',
    name: 'Free Drink',
    points: 200,
  },
];

export function RewardsScreen() {
  const { user } = useAuth();
  const points = user?.rewardPoints ?? 0;

  const nextReward = REWARDS.find(
    (reward) => points < reward.points
  );

  return (
    <View style={styles.container}>
      <Text style={[type.h1, styles.title]}>
        Rewards
      </Text>

      <View style={styles.card}>
        <Text style={[type.caption, styles.label]}>
          YOUR BALANCE
        </Text>

        <Text style={styles.points}>
          {points}
        </Text>

        <Text style={[type.body, styles.pointsLabel]}>
          points
        </Text>
      </View>

      <View style={styles.rewardsSection}>
        {REWARDS.map((reward) => (
          <View
            key={reward.id}
            style={styles.rewardCard}
          >
            <Text
              style={[
                type.h3,
                styles.rewardName,
              ]}
            >
              {reward.name}
            </Text>

            <Text
              style={[
                type.body,
                styles.rewardPoints,
              ]}
            >
              {reward.points} points
            </Text>

            <Text
              style={[
                type.caption,
                styles.rewardStatus,
              ]}
            >
              {points >= reward.points
                ? 'Available to redeem'
                : `${reward.points - points} more points`}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    color: colors.espresso,
    marginBottom: 24,
  },

  card: {
    backgroundColor: colors.espresso,
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    marginBottom: 28,
  },

  label: {
    color: colors.cream,
    opacity: 0.7,
    marginBottom: 4,
  },

  points: {
    fontSize: 48,
    color: colors.white,
    fontWeight: '700',
  },

  pointsLabel: {
    color: colors.cream,
    opacity: 0.8,
  },

  rewardsSection: {
    gap: 12,
  },

  rewardCard: {
    backgroundColor: colors.creamLight,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  rewardName: {
    color: colors.espresso,
    marginBottom: 4,
  },

  rewardPoints: {
    color: colors.roast,
  },

  rewardStatus: {
    color: colors.sage,
    marginTop: 8,
  },
});