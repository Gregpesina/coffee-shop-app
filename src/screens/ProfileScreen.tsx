import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { logOut } from '../services/authService';

export function ProfileScreen() {
  const { user, setUser } = useAuth();

  async function handleLogOut() {
    await logOut();
    setUser(null);
  }

  return (
    <View style={styles.container}>
      <Text style={[type.h1, styles.title]}>Profile</Text>

      <View style={styles.card}>
        <Text style={[type.h3, styles.name]}>{user?.name}</Text>
        <Text style={[type.body, styles.email]}>{user?.email}</Text>
      </View>

      <Button label="Log out" variant="secondary" onPress={handleLogOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, paddingTop: 60, paddingHorizontal: 20 },
  title: { color: colors.espresso, marginBottom: 24 },
  card: { backgroundColor: colors.creamLight, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 28 },
  name: { color: colors.espresso, marginBottom: 4 },
  email: { color: colors.roast },
});
