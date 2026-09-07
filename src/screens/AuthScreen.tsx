import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';
import { Button } from '../components/Button';
import { signUp, logIn } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  async function handleSubmit() {
    setLoading(true);
    try {
      const profile = mode === 'login' ? await logIn(email, password) : await signUp(name, email, password);
      setUser(profile);
    } catch (err: any) {
      Alert.alert('Something went wrong', err.message ?? 'Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <Text style={[type.h1, styles.title]}>{mode === 'login' ? 'Welcome back' : 'Create your account'}</Text>
      <Text style={[type.body, styles.subtitle]}>
        {mode === 'login' ? 'Log in to order and track your rewards.' : 'Sign up to start earning rewards on every order.'}
      </Text>

      {mode === 'signup' && (
        <TextInput style={styles.input} placeholder="Full name" placeholderTextColor={colors.roast} value={name} onChangeText={setName} />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.roast}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.roast}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button label={mode === 'login' ? 'Log in' : 'Sign up'} onPress={handleSubmit} loading={loading} style={styles.submit} />

      <Text style={styles.switchText} onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}>
        {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, padding: 24, justifyContent: 'center' },
  title: { color: colors.espresso, marginBottom: 8 },
  subtitle: { color: colors.roast, marginBottom: 28 },
  input: {
    backgroundColor: colors.creamLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    color: colors.espresso,
  },
  submit: { marginTop: 8 },
  switchText: { textAlign: 'center', color: colors.honeyDark, marginTop: 20 },
});
