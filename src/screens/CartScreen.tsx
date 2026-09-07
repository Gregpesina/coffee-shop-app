import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';
import { Button } from '../components/Button';
import { CartLineItem } from '../components/CartLineItem';
import { useCart } from '../context/CartContext';
import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  calculatePoints,
} from '../services/orderService';

export function CartScreen({ navigation }: any) {
  const { lines, updateQuantity } = useCart();

  const subtotal = calculateSubtotal(lines);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(lines);
  const points = calculatePoints(total);

  if (lines.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={[type.h2, styles.emptyTitle]}>
          Your cart is empty
        </Text>

        <Text style={[type.body, styles.emptyText]}>
          Add something from the menu to get started.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[type.h1, styles.title]}>
        Your order
      </Text>

      <FlatList
        data={lines}
        keyExtractor={(line) => line.id}
        renderItem={({ item: line }) => (
          <CartLineItem
            line={line}
            onIncrease={() =>
              updateQuantity(line.id, line.quantity + 1)
            }
            onDecrease={() =>
              updateQuantity(line.id, line.quantity - 1)
            }
          />
        )}
      />

      <View style={styles.summary}>

        <View style={styles.summaryRow}>
          <Text style={[type.body, styles.summaryLabel]}>
            Subtotal
          </Text>

          <Text style={[type.body, styles.summaryValue]}>
            ${subtotal.toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[type.body, styles.summaryLabel]}>
            Tax
          </Text>

          <Text style={[type.body, styles.summaryValue]}>
            ${tax.toFixed(2)}
          </Text>
        </View>

        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={[type.h3, styles.summaryLabel]}>
            Total
          </Text>

          <Text style={[type.h3, styles.summaryValue]}>
            ${total.toFixed(2)}
          </Text>
        </View>

        <Text style={[type.caption, styles.pointsNote]}>
          You'll earn {points} reward points on this order.
        </Text>

        <Button
          label="Go to checkout"
          onPress={() => navigation.navigate('Checkout')}
          style={styles.checkoutButton}
        />

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
    marginBottom: 16,
  },

  summary: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 24,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  summaryLabel: {
    color: colors.roast,
  },

  summaryValue: {
    color: colors.espresso,
  },

  pointsNote: {
    color: colors.sage,
    marginBottom: 16,
  },

  checkoutButton: {},

  empty: {
    flex: 1,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  emptyTitle: {
    color: colors.espresso,
    marginBottom: 8,
  },

  emptyText: {
    color: colors.roast,
    textAlign: 'center',
  },
});