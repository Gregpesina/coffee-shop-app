import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { MenuItem } from '../types';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';

export function MenuItemCard({ item, onPress }: { item: MenuItem; onPress: () => void }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <Image source={{ uri: `${item.imageUrl}?w=200&q=60` }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[type.h3, styles.name]}>{item.name}</Text>
        <Text style={[type.caption, styles.description]} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={[type.bodyMedium, styles.price]}>${item.basePrice.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.creamLight,
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.8 },
  image: { width: 88, height: 88 },
  info: { flex: 1, padding: 12, justifyContent: 'center' },
  name: { color: colors.espresso, marginBottom: 2 },
  description: { color: colors.roast, marginBottom: 6 },
  price: { color: colors.honeyDark },
});
