import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import { colors } from '../theme/colors';
import { type } from '../theme/typography';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  calculatePoints,
  placeOrder,
} from '../services/orderService';

export function CheckoutScreen({ navigation }: any) {
  const { lines, clearCart } = useCart();
  const { user, addPointsLocally } = useAuth();

  const [loading, setLoading] = useState(false);

  const subtotal = calculateSubtotal(lines);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(lines);
  const points = calculatePoints(total);

  const itemCount = lines.reduce(
    (count, line) => count + line.quantity,
    0
  );

  async function handlePay() {
    if (!user) return;

    setLoading(true);

    try {
      // Simulate a payment processing delay.
      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      // Save the order to Firebase.
      await placeOrder(user.uid, lines);

      // Update reward points immediately.
      addPointsLocally(points);

      // Empty the cart.
      clearCart();

      // Go to confirmation screen.
      navigation.replace('OrderConfirmed');

    } catch (err: any) {
      Alert.alert(
        'Order failed',
        err.message ?? 'Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      {/* HEADER */}
      <Text style={[type.h1, styles.title]}>
        Checkout
      </Text>

      {/* DEMO PAYMENT NOTICE */}
      <View style={styles.demoCard}>
        <Text style={[type.bodyMedium, styles.demoTitle]}>
          🧪 Demo Payment
        </Text>

        <Text style={[type.body, styles.demoText]}>
          This is a prototype payment. No real money or
          credit card will be charged.
        </Text>
      </View>

      {/* ORDER SUMMARY */}
      <Text style={[type.label, styles.sectionTitle]}>
        YOUR ORDER
      </Text>

      <View style={styles.orderCard}>

        {lines.map((line) => {
          const extraShotPrice =
            line.customization.extraShot
              ? 1.00
              : 0;

          const unitPrice =
            line.menuItem.basePrice +
            line.size.priceModifier +
            extraShotPrice;

          return (
            <View
              key={line.id}
              style={styles.item}
            >

              <View style={styles.itemInfo}>

                <Text
                  style={[
                    type.bodyMedium,
                    styles.itemName,
                  ]}
                >
                  {line.menuItem.name}
                </Text>

                <Text
                  style={[
                    type.caption,
                    styles.itemDetails,
                  ]}
                >
                  {line.size.label} ·{' '}
                  {line.customization.milk}
                </Text>

                <Text
                  style={[
                    type.caption,
                    styles.itemDetails,
                  ]}
                >
                  {line.customization.sweetness}{' '}
                  sweetness
                  {line.customization.extraShot
                    ? ' · Extra shot'
                    : ''}
                </Text>

                <Text
                  style={[
                    type.caption,
                    styles.quantityText,
                  ]}
                >
                  Qty: {line.quantity}
                </Text>

              </View>

              <Text
                style={[
                  type.bodyMedium,
                  styles.itemPrice,
                ]}
              >
                ${(unitPrice * line.quantity).toFixed(2)}
              </Text>

            </View>
          );
        })}

      </View>

      {/* PRICE SUMMARY */}
      <Text style={[type.label, styles.sectionTitle]}>
        PRICE SUMMARY
      </Text>

      <View style={styles.summaryCard}>

        <View style={styles.row}>
          <Text style={[type.body, styles.label]}>
            Items
          </Text>

          <Text style={[type.body, styles.value]}>
            {itemCount}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[type.body, styles.label]}>
            Subtotal
          </Text>

          <Text style={[type.body, styles.value]}>
            ${subtotal.toFixed(2)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[type.body, styles.label]}>
            Tax
          </Text>

          <Text style={[type.body, styles.value]}>
            ${tax.toFixed(2)}
          </Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={[type.h3, styles.totalLabel]}>
            Total
          </Text>

          <Text style={[type.h3, styles.totalValue]}>
            ${total.toFixed(2)}
          </Text>
        </View>

      </View>

      {/* REWARDS */}
      <View style={styles.rewardsCard}>

        <Text style={[type.bodyMedium, styles.rewardsTitle]}>
          ⭐ Rewards
        </Text>

        <Text style={[type.body, styles.rewardsText]}>
          You'll earn {points} points with this order.
        </Text>

      </View>

      {/* PAYMENT MESSAGE */}
      <Text style={[type.caption, styles.disclaimer]}>
        This prototype uses a simulated payment. No
        payment information is collected or charged.
      </Text>

      {/* PAY BUTTON */}
      <Button
        label={
          loading
            ? 'Processing demo payment...'
            : `Complete Demo Payment · $${total.toFixed(2)}`
        }
        onPress={handlePay}
        loading={loading}
        style={styles.payButton}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  title: {
    color: colors.espresso,
    marginBottom: 20,
  },

  demoCard: {
    backgroundColor: colors.creamLight,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 24,
  },

  demoTitle: {
    color: colors.espresso,
    marginBottom: 5,
  },

  demoText: {
    color: colors.roast,
    lineHeight: 20,
  },

  sectionTitle: {
    color: colors.roast,
    marginBottom: 10,
    marginTop: 4,
  },

  orderCard: {
    backgroundColor: colors.creamLight,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 24,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  itemInfo: {
    flex: 1,
    paddingRight: 12,
  },

  itemName: {
    color: colors.espresso,
    marginBottom: 3,
  },

  itemDetails: {
    color: colors.roast,
    marginTop: 2,
  },

  quantityText: {
    color: colors.roast,
    marginTop: 5,
  },

  itemPrice: {
    color: colors.espresso,
  },

  summaryCard: {
    backgroundColor: colors.creamLight,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  label: {
    color: colors.roast,
  },

  value: {
    color: colors.espresso,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginTop: 4,
  },

  totalLabel: {
    color: colors.espresso,
  },

  totalValue: {
    color: colors.espresso,
  },

  rewardsCard: {
    backgroundColor: colors.creamLight,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
  },

  rewardsTitle: {
    color: colors.espresso,
    marginBottom: 4,
  },

  rewardsText: {
    color: colors.sage,
  },

  disclaimer: {
    color: colors.roast,
    marginBottom: 24,
    lineHeight: 18,
  },

  payButton: {},
});