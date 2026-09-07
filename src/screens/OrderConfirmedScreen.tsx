import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';
import { Button } from '../components/Button';

export function OrderConfirmedScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>☕</Text>
      <Text style={[type.h1, styles.title]}>Order placed!</Text>
      <Text style={[type.body, styles.subtitle]}>We're on it. You'll get a notification when it's ready for pickup.</Text>
      <Button label="Back to menu" onPress={() => navigation.navigate('Home')} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emoji: { fontSize: 56, marginBottom: 16 },
  title: { color: colors.espresso, marginBottom: 8 },
  subtitle: { color: colors.roast, textAlign: 'center', marginBottom: 32 },
  button: { width: '100%' },
});
