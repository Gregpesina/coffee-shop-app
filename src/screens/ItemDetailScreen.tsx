import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { colors } from '../theme/colors';
import { type } from '../theme/typography';
import { Button } from '../components/Button';
import { MENU_ITEMS } from '../services/menuData';
import { useCart } from '../context/CartContext';
import { SizeOption } from '../types';

export function ItemDetailScreen({ route, navigation }: any) {
  const { itemId } = route.params;

  const item = MENU_ITEMS.find(
    (menuItem) => menuItem.id === itemId
  )!;

  const [selectedSize, setSelectedSize] =
    useState<SizeOption>(item.sizes[0]);

  const [selectedMilk, setSelectedMilk] =
    useState('Whole Milk');

  const [selectedSweetness, setSelectedSweetness] =
    useState('100%');

  const [extraShot, setExtraShot] =
    useState(false);

  const [quantity, setQuantity] =
    useState(1);

  const { addToCart } = useCart();

  const extraShotPrice =
    item.allowsExtraShot && extraShot
      ? 1.00
      : 0;

  const unitPrice =
    item.basePrice +
    selectedSize.priceModifier +
    extraShotPrice;

  function handleAdd() {
    addToCart(
      item,
      selectedSize,
      quantity,
      {
        milk: item.allowsMilk
          ? selectedMilk
          : 'None',

        sweetness: item.allowsSweetness
          ? selectedSweetness
          : 'None',

        extraShot:
          item.allowsExtraShot
            ? extraShot
            : false,
      }
    );

    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>

      <Image
        source={{
          uri: `${item.imageUrl}?w=600&q=70`,
        }}
        style={styles.image}
      />

      <View style={styles.body}>

        <Text style={[type.h1, styles.name]}>
          {item.name}
        </Text>

        <Text
          style={[
            type.body,
            styles.description,
          ]}
        >
          {item.description}
        </Text>

        {/* SIZE */}
        {item.sizes.length > 1 && (
          <>
            <Text
              style={[
                type.label,
                styles.sectionLabel,
              ]}
            >
              SIZE
            </Text>

            <View style={styles.optionRow}>

              {item.sizes.map((size) => {
                const active =
                  size.id === selectedSize.id;

                return (
                  <Pressable
                    key={size.id}
                    onPress={() =>
                      setSelectedSize(size)
                    }
                    style={[
                      styles.optionChip,
                      active &&
                        styles.optionChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        type.bodyMedium,
                        active
                          ? styles.optionTextActive
                          : styles.optionText,
                      ]}
                    >
                      {size.label}
                    </Text>
                  </Pressable>
                );
              })}

            </View>
          </>
        )}

        {/* MILK */}
        {item.allowsMilk && (
          <>
            <Text
              style={[
                type.label,
                styles.sectionLabel,
              ]}
            >
              MILK
            </Text>

            <View style={styles.optionWrap}>

              {[
                'Whole Milk',
                '2%',
                'Oat Milk',
                'Almond Milk',
              ].map((milk) => {

                const active =
                  milk === selectedMilk;

                return (
                  <Pressable
                    key={milk}
                    onPress={() =>
                      setSelectedMilk(milk)
                    }
                    style={[
                      styles.optionChip,
                      active &&
                        styles.optionChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        type.bodyMedium,
                        active
                          ? styles.optionTextActive
                          : styles.optionText,
                      ]}
                    >
                      {milk}
                    </Text>
                  </Pressable>
                );

              })}

            </View>
          </>
        )}

        {/* SWEETNESS */}
        {item.allowsSweetness && (
          <>
            <Text
              style={[
                type.label,
                styles.sectionLabel,
              ]}
            >
              SWEETNESS
            </Text>

            <View style={styles.optionRow}>

              {[
                '0%',
                '50%',
                '100%',
              ].map((sweetness) => {

                const active =
                  sweetness ===
                  selectedSweetness;

                return (
                  <Pressable
                    key={sweetness}
                    onPress={() =>
                      setSelectedSweetness(
                        sweetness
                      )
                    }
                    style={[
                      styles.optionChip,
                      active &&
                        styles.optionChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        type.bodyMedium,
                        active
                          ? styles.optionTextActive
                          : styles.optionText,
                      ]}
                    >
                      {sweetness}
                    </Text>
                  </Pressable>
                );

              })}

            </View>
          </>
        )}

        {/* EXTRA SHOT */}
        {item.allowsExtraShot && (
          <>
            <Text
              style={[
                type.label,
                styles.sectionLabel,
              ]}
            >
              ESPRESSO
            </Text>

            <Pressable
              onPress={() =>
                setExtraShot(!extraShot)
              }
              style={[
                styles.extraShot,
                extraShot &&
                  styles.optionChipActive,
              ]}
            >
              <Text
                style={[
                  type.bodyMedium,
                  extraShot
                    ? styles.optionTextActive
                    : styles.optionText,
                ]}
              >
                {extraShot
                  ? '✓ Extra espresso shot +$1.00'
                  : 'Add extra espresso shot +$1.00'}
              </Text>
            </Pressable>
          </>
        )}

        {/* QUANTITY */}
        <Text
          style={[
            type.label,
            styles.sectionLabel,
          ]}
        >
          QUANTITY
        </Text>

        <View style={styles.stepper}>

          <Pressable
            style={styles.stepButton}
            onPress={() =>
              setQuantity((q) =>
                Math.max(1, q - 1)
              )
            }
          >
            <Text style={styles.stepText}>
              –
            </Text>
          </Pressable>

          <Text
            style={[
              type.h3,
              styles.quantity,
            ]}
          >
            {quantity}
          </Text>

          <Pressable
            style={styles.stepButton}
            onPress={() =>
              setQuantity((q) => q + 1)
            }
          >
            <Text style={styles.stepText}>
              +
            </Text>
          </Pressable>

        </View>

      </View>

      <View style={styles.footer}>

        <Button
          label={`Add to cart · $${(
            unitPrice * quantity
          ).toFixed(2)}`}
          onPress={handleAdd}
        />

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  image: {
    width: '100%',
    height: 260,
  },

  body: {
    padding: 20,
  },

  name: {
    color: colors.espresso,
    marginBottom: 8,
  },

  description: {
    color: colors.roast,
    marginBottom: 24,
  },

  sectionLabel: {
    color: colors.roast,
    marginBottom: 10,
    marginTop: 8,
  },

  optionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },

  optionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },

  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.creamLight,
  },

  optionChipActive: {
    backgroundColor: colors.espresso,
    borderColor: colors.espresso,
  },

  optionText: {
    color: colors.espresso,
  },

  optionTextActive: {
    color: colors.white,
  },

  extraShot: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.creamLight,
    marginBottom: 18,
  },

  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  stepButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepText: {
    fontSize: 20,
    color: colors.espresso,
    marginTop: -2,
  },

  quantity: {
    width: 44,
    textAlign: 'center',
    color: colors.espresso,
  },

  footer: {
    padding: 20,
    paddingBottom: 36,
  },
});