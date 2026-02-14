import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/constants/Colors';
import { BookOpen, Fingerprint, Construction, CheckCircle } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';

const ExploreCard = ({ title, icon: Icon, color, onPress, fullWidth = false }) => (
  <Pressable 
    style={[styles.card, { backgroundColor: color, width: fullWidth ? '100%' : '48%' }]} 
    onPress={onPress}
  >
    <View style={styles.iconCircle}>
      <Icon size={32} color="white" />
    </View>
    <Text style={styles.cardText}>{title}</Text>
  </Pressable>
);

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Back Button */}
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </Pressable>

        <Text style={styles.headerTitle}>Learning Lab</Text>
        <Text style={styles.headerSubtitle}>Tap a card to start your training!</Text>

        <View style={styles.grid}>
          {/* Top Two Buttons */}
          <ExploreCard 
            title="What is Forensics?" 
            icon={BookOpen} 
            color="#FF6B6B" 
            onPress={() => console.log('Forensics Intro')} 
          />
          <ExploreCard 
            title="Evidences" 
            icon={Fingerprint} 
            color="#4ECDC4" 
           onPress={() => router.push('/evidences')} 
          />
          
          {/* Bottom Full-Width Button */}
          <View style={{ width: '100%', marginTop: 15 }}>
            <ExploreCard 
              title="Crime Scene Do's and Don'ts" 
              icon={Construction} 
              color="#FFD93D" 
              fullWidth={true}
              onPress={() => console.log('Dos and Donts')} 
            />
          </View>
        </View>
      </ScrollView>

      {/* NEW: All Done Button in Bottom Right */}
      <Pressable 
        style={styles.doneButton} 
        onPress={() => router.push('/testmode')}
      >
        <Text style={styles.doneText}>All done</Text>
        <CheckCircle size={18} color="white" style={{ marginLeft: 6 }} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingTop: 60, paddingBottom: 100 }, // Extra bottom padding for the button
  backButton: { marginBottom: 20 },
  headerTitle: { fontSize: 32, fontWeight: '900', color: Colors.text },
  headerSubtitle: { fontSize: 16, color: '#94A3B8', marginBottom: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  iconCircle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  cardText: { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  
  // Styles for the new "All done" button
  doneButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#4CAF50', // Success Green
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  doneText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  }
});