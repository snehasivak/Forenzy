import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/constants/Colors';
import { Fingerprint, TestTube, Camera, FileText, CheckCircle } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';

const EvidenceItem = ({ title, description, icon: Icon, color }) => (
  <View style={styles.evidenceCard}>
    <View style={[styles.iconBox, { backgroundColor: color }]}>
      <Icon size={28} color="white" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.evidenceTitle}>{title}</Text>
      <Text style={styles.evidenceDescription}>{description}</Text>
    </View>
  </View>
);

export default function EvidencesScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </Pressable>

        <Text style={styles.headerTitle}>Types of Evidence</Text>
        <Text style={styles.headerSubtitle}>Detectives use these clues to solve cases!</Text>

        <View style={styles.list}>
          <EvidenceItem 
            title="Fingerprints" 
            description="Unique patterns found on fingertips." 
            icon={Fingerprint} 
            color="#FF6B6B" 
          />
          <EvidenceItem 
            title="DNA Clues" 
            description="Found in hair, skin, or droplets." 
            icon={TestTube} 
            color="#4ECDC4" 
          />
          <EvidenceItem 
            title="Photos" 
            description="Visual records of the crime scene." 
            icon={Camera} 
            color="#FFD93D" 
          />
          <EvidenceItem 
            title="Documents" 
            description="Handwritten notes or digital files." 
            icon={FileText} 
            color="#6C9BCF" 
          />
        </View>
      </ScrollView>

      {/* Floating All Done Button */}
      <Pressable 
        style={styles.doneButton} 
        onPress={() => router.push('/explore')}
      >
        <Text style={styles.doneText}>All done</Text>
        <CheckCircle size={18} color="white" style={{ marginLeft: 6 }} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: 20, paddingTop: 60, paddingBottom: 120 },
  backButton: { marginBottom: 20 },
  headerTitle: { fontSize: 32, fontWeight: '900', color: Colors.text },
  headerSubtitle: { fontSize: 16, color: '#94A3B8', marginBottom: 30 },
  list: { gap: 15 },
  evidenceCard: {
    flexDirection: 'row',
    backgroundColor: '#1E293B', // Dark card to match her theme
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  iconBox: {
    padding: 12,
    borderRadius: 15,
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  evidenceTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  evidenceDescription: { fontSize: 14, color: '#94A3B8', marginTop: 2 },
  doneButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#4CAF50',
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
  doneText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
});