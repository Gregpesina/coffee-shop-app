import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CartLine } from '../types';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';

interface Props {
  line: CartLine;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function CartLineItem({
  line,
  onIncrease,
  onDecrease,
}: Props) {
  const extraShotPrice = line.customization.extraShot ? 1.00 : 0;

  const unitPrice =
    line.menuItem.basePrice +
    line.size.priceModifier +
    extraShotPrice;

  return (
    <View style={styles.card}>

      {/* ITEM INFORMATION */}
      <View style={styles.info}>

        <View style={styles.topRow}>
          <Text style={[type.bodyMedium, styles.name]}>
            {line.menuItem.name}
          </Text>

          <Text style={[type.bodyMedium, styles.price]}>
            ${(unitPrice * line.quantity).toFixed(2)}
          </Text>
        </View>

        <Text style={[type.caption, styles.size]}>
          {line.size.label}
        </Text>

        <View style={styles.customizations}>

          <Text style={[type.caption, styles.customization]}>
            {line.customization.milk}
          </Text>

          <Text style={[type.caption, styles.dot]}>
            •
          </Text>

          <Text style={[type.caption, styles.customization]}>
            {line.customization.sweetness} sweetness
          </Text>

          {line.customization.extraShot && (
            <>
              <Text style={[type.caption, styles.dot]}>
                •
              </Text>

              <Text style={[type.caption, styles.extraShot]}>
                Extra shot +$1.00
              </Text>
            </>
          )}

        </View>

        {/* QUANTITY */}
        <View style={styles.bottomRow}>

          <View style={styles.stepper}>

            <Pressable
              onPress={onDecrease}
              style={styles.stepButton}
              hitSlop={8}
            >
              <Text style={styles.stepText}>
                −
              </Text>
            </Pressable>

            <Text style={[type.bodyMedium, styles.quantity]}>
              {line.quantity}
            </Text>

            <Pressable
              onPress={onIncrease}
              style={styles.stepButton}
              hitSlop={8}
            >
              <Text style={styles.stepText}>
                +
              </Text>
            </Pressable>

          </View>

          <Text style={[type.caption, styles.unitPrice]}>
            ${unitPrice.toFixed(2)} each
          </Text>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: colors.creamLight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  info: {
    flex: 1,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    color: colors.espresso,
    flex: 1,
  },

  price: {
    color: colors.espresso,
    marginLeft: 12,
  },

  size: {
    color: colors.roast,
    marginTop: 4,
  },

  customizations: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 8,
  },

  customization: {
    color: colors.roast,
  },

  dot: {
    color: colors.roast,
    marginHorizontal: 6,
  },

  extraShot: {
    color: colors.espresso,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },

  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  stepButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cream,
  },

  stepText: {
    fontSize: 18,
    color: colors.espresso,
    marginTop: -2,
  },

  quantity: {
    width: 34,
    textAlign: 'center',
    color: colors.espresso,
  },

  unitPrice: {
    color: colors.roast,
  },

});