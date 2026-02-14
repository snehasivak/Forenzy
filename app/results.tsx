import React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '../src/constants/Colors';
import { Medal, Award, Star, Home } from 'lucide-react-native';
// 1. Import the global user hook
import { useUser } from '../UserContext'; 

const { width } = Dimensions.get('window');

export default function ResultsScreen() {
  const router = useRouter();
  
  // 2. Access the global userName
  const { userName } = useUser(); 
  
  // We still get the score from the URL params
  const { score } = useLocalSearchParams();
  
  const finalScore = parseInt(score as string) || 0;
  
  const getResultsData = () => {
    if (finalScore >= 90) {
      return { 
        label: 'Master Detective', 
        icon: Award, 
        color: '#FFD700', // Gold
        message: 'Incredible work! You have a sharp eye for clues.' 
      };
    } else if (finalScore >= 70) {
      return { 
        label: 'Senior Sleuth', 
        icon: Medal, 
        color: '#C0C0C0', // Silver
        message: 'Great job! You are well on your way to being a pro.' 
      };
    } else {
      return { 
        label: 'Junior Agent', 
        icon: Star, 
        color: '#CD7F32', // Bronze
        message: 'Good start! Keep practicing to sharpen your skills.' 
      };
    }
  };

  const results = getResultsData();
  const BadgeIcon = results.icon;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.congrats}>Case Closed!</Text>
        
        {/* 3. Display the name from Context */}
        <Text style={styles.nameText}>Junior Detective {userName}</Text>

        <View style={[styles.badgeCircle, { borderColor: results.color }]}>
          <BadgeIcon size={100} color={results.color} />
        </View>

        <Text style={styles.badgeLabel}>{results.label}</Text>
        <Text style={styles.scoreText}>Final Score: {finalScore}%</Text>
        <Text style={styles.messageText}>{results.message}</Text>
      </View>

      <View style={styles.footer}>
        <Pressable 
          style={styles.homeButton} 
          onPress={() => router.push('/')}
        >
          <Home size={20} color="#0F172A" style={{ marginRight: 10 }} />
          <Text style={styles.homeButtonText}>New Investigation</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    padding: 24 
  },
  content: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  congrats: { 
    fontSize: 40, 
    fontWeight: '900', 
    color: Colors.primary, 
    marginBottom: 10,
    letterSpacing: 2
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 30,
    textAlign: 'center'
  },
  badgeCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    backgroundColor: Colors.card,
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
  },
  badgeLabel: { 
    fontSize: 28, 
    fontWeight: '900', 
    color: 'white', 
    marginBottom: 10 
  },
  scoreText: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: Colors.primary, 
    marginBottom: 15 
  },
  messageText: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24
  },
  footer: {
    marginBottom: 20,
  },
  homeButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  homeButtonText: { 
    color: '#0F172A', 
    fontWeight: 'bold', 
    fontSize: 16,
    letterSpacing: 1
  },
});