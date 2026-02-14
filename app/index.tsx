import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../src/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// 1. Import the router
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  // 2. Initialize the router
  const router = useRouter();

  const dynamicPadding = {
    paddingTop: insets.top > 0 ? insets.top : 20,
    paddingBottom: insets.bottom > 0 ? insets.bottom : 20,
  };

  return (
    <View style={[styles.container, dynamicPadding]}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <MaterialCommunityIcons name="shield-search" size={50} color={Colors.primary} />
        </View>
        <Text style={styles.title}>FORENZY</Text>
        <Text style={styles.subtitle}>Digital Evidence Management</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          // 3. Update the onPress to navigate to your menu
          onPress={() => router.push('/menu')} 
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>INITIALIZE SCAN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ... styles remain the same as your teammate's code ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 8,
    textTransform: 'uppercase',
  },
  footer: {
    gap: 12,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0F172A', 
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 2,
  },
});