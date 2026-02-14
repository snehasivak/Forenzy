import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../src/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// 1. Import the global user hook
import { useUser } from '../UserContext'; 

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  // 2. Access the global setUserName function
  const { setUserName } = useUser();
  
  const [name, setName] = useState('');

  const dynamicPadding = {
    paddingTop: insets.top > 0 ? insets.top : 20,
    paddingBottom: insets.bottom > 0 ? insets.bottom : 20,
  };

  const handleInitialize = () => {
    if (name.trim()) {
      // 3. Save name globally so it's remembered throughout the app
      setUserName(name.trim()); 
      
      // Navigate to menu (no need to pass params in URL anymore)
      router.push('/menu');
    } else {
      Alert.alert("Access Denied", "Please identify yourself, Detective!");
    }
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

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>IDENTIFY YOURSELF, DETECTIVE:</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="Enter Name..."
          placeholderTextColor="rgba(148, 163, 184, 0.5)"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={handleInitialize}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleInitialize} 
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>INITIALIZE SCAN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  inputContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  inputLabel: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 1,
  },
  nameInput: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.3)',
    borderRadius: 8,
    padding: 15,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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