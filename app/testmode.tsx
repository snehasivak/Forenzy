import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/constants/Colors';
import { Send } from 'lucide-react-native'; // Using Send icon for submit
import { Ionicons } from '@expo/vector-icons';

// ... QuizCard component remains the same ...

export default function TestModeScreen() {
  const router = useRouter();

  const handleSubmit = () => {
    // For your demo, we'll send a score of 85
    router.push({
      pathname: '/results',
      params: { score: 85 }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </Pressable>

        <Text style={styles.headerTitle}>Final Exam</Text>
        <Text style={styles.headerSubtitle}>Answer the questions to earn your badge!</Text>
        
        {/* Placeholder for your actual quiz questions */}
        <View style={styles.quizPlaceholder}>
            <Text style={{color: '#94A3B8', textAlign: 'center'}}>Quiz Questions go here...</Text>
        </View>
      </ScrollView>

      {/* CHANGED: All Done -> Submit Button */}
      <Pressable 
        style={styles.submitButton} 
        onPress={handleSubmit}
      >
        <Text style={styles.submitText}>Submit Test</Text>
        <Send size={18} color="#0F172A" style={{ marginLeft: 8 }} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingTop: 60, paddingBottom: 120 },
  backButton: { marginBottom: 20 },
  headerTitle: { fontSize: 32, fontWeight: '900', color: Colors.text },
  headerSubtitle: { fontSize: 16, color: '#94A3B8', marginBottom: 30 },
  quizPlaceholder: { 
    height: 300, 
    justifyContent: 'center', 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 20,
    borderStyle: 'dashed'
  },
  submitButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: Colors.primary, // Using her neon primary color
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    elevation: 10,
  },
  submitText: { color: '#0F172A', fontWeight: 'bold', fontSize: 16 },
});