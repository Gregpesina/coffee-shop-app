import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';
import { MenuItemCard } from '../components/MenuItemCard';
import { MENU_ITEMS } from '../services/menuData';
import { MenuCategory } from '../types';

const CATEGORIES: MenuCategory[] = ['Espresso', 'Brewed', 'Cold', 'Tea', 'Food'];

export function HomeScreen({ navigation }: any) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Espresso');

  const filteredItems = useMemo(
    () => MENU_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <View style={styles.container}>
      <Text style={[type.h1, styles.title]}>Good morning</Text>
      <Text style={[type.body, styles.subtitle]}>What can we get started for you?</Text>

      <View style={styles.categoryRow}>
        {CATEGORIES.map((category) => {
          const active = category === activeCategory;
          return (
            <Pressable key={category} onPress={() => setActiveCategory(category)} style={[styles.chip, active && styles.chipActive]}>
              <Text style={[type.label, active ? styles.chipTextActive : styles.chipText]}>{category}</Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MenuItemCard item={item} onPress={() => navigation.navigate('ItemDetail', { itemId: item.id })} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, paddingTop: 60, paddingHorizontal: 20 },
  title: { color: colors.espresso },
  subtitle: { color: colors.roast, marginTop: 4, marginBottom: 20 },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: colors.creamLight, borderWidth: 1, borderColor: colors.border },
  chipActive: { backgroundColor: colors.espresso, borderColor: colors.espresso },
  chipText: { color: colors.roast },
  chipTextActive: { color: colors.white },
  list: { paddingBottom: 40 },
});
