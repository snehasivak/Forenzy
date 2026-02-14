import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '../src/constants/Colors';
import { Medal, Award, Star } from 'lucide-react-native';

export default function ResultsScreen() {
  const router = useRouter();
  const { score } = useLocalSearchParams();
  const finalScore = parseInt(score as string) || 0;

  // Logic to determine badge
  const getBadge = () => {
    if (finalScore >= 90) return { label: 'Master Detective', icon: Award, color: '#FFD700' };
    if (finalScore >= 70) return { label: 'Senior Sleuth', icon: Medal, color: '#C0C0C0' };
    return { label: 'Junior Agent', icon: Star, color: '#CD7F32' };
  };

  const badge = getBadge();
  const BadgeIcon = badge.icon;

  return (
    <View style={styles.container}>
      <Text style={styles.congrats}>Case Closed!</Text>
      
      <View style={[styles.badgeCircle, { borderColor: badge.color }]}>
        <BadgeIcon size={80} color={badge.color} />
      </View>

      <Text style={styles.badgeLabel}>{badge.label}</Text>
      <Text style={styles.scoreText}>Your Score: {finalScore}%</Text>

      <Pressable 
        style={styles.homeButton} 
        onPress={() => router.push('/menu')}
      >
        <Text style={styles.homeButtonText}>Return to Menu</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', padding: 20 },
  congrats: { fontSize: 36, fontWeight: '900', color: Colors.text, marginBottom: 40 },
  badgeCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 4,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
  },
  badgeLabel: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 10 },
  scoreText: { fontSize: 18, color: '#94A3B8', marginBottom: 40 },
  homeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  homeButtonText: { color: '#0F172A', fontWeight: 'bold', fontSize: 16 },
});