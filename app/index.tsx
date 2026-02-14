import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, Alert, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from '../UserContext'; 

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { setUserName } = useUser();
  const [name, setName] = useState('');

  // Pleasant, positive color constants
  const UI_COLORS = {
    background: '#F0F9FF', // Light airy blue
    primary: '#4ECDC4',    // Friendly Mint
    secondary: '#FFD166',  // Sunny Yellow
    accent: '#6C5CE7',     // Playful Purple
    text: '#2D3436',       // Soft Dark Grey
    card: '#FFFFFF',       // Pure White
  };

  const handleInitialize = () => {
    if (name.trim()) {
      setUserName(name.trim()); 
      router.push('/menu');
    } else {
      Alert.alert("Wait, Detective!", "We need to know your name before the mission begins! 🔍");
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 }]}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Decoration */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <MaterialCommunityIcons name="magnify-scan" size={60} color="#4ECDC4" />
        </View>
        <Text style={styles.title}>FORENZY</Text>
        <View style={styles.badge}>
          <Text style={styles.subtitle}>JUNIOR DETECTIVE LAB</Text>
        </View>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>What's your name, Hero?</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="Type your name here..."
          placeholderTextColor="#A0AEC0"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <Text style={styles.hintText}>Your mystery-solving journey starts here!</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleInitialize} 
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>START ANALYSING</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF', 
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    // Soft kid-friendly shadow
    shadowColor: "#4ECDC4",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#2D3436',
    letterSpacing: 4,
  },
  badge: {
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 30,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  inputLabel: {
    color: '#2D3436',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  nameInput: {
    backgroundColor: '#F7FAFC',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 15,
    padding: 18,
    color: '#2D3436',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  hintText: {
    color: '#718096',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
  },
  footer: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: "#4ECDC4",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF', 
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 1,
  },
});