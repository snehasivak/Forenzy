import React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Medal, Award, Star, Home } from 'lucide-react-native';
// Import the global user hook
import { useUser } from '../UserContext'; 

const { width } = Dimensions.get('window');

// Academy Palette - Consistent with your new theme
const ACADEMY_COLORS = {
  background: '#F0F9FF', 
  text: '#2D3436',       
  mint: '#4ECDC4',    
  white: '#FFFFFF',
  softGrey: '#94A3B8'
};

export default function ResultsScreen() {
  const router = useRouter();
  const { userName } = useUser(); 
  const { score } = useLocalSearchParams();
  
  const finalScore = parseInt(score as string) || 0;
  
  const getResultsData = () => {
    if (finalScore >= 90) {
      return { 
        label: 'Master Detective', 
        icon: Award, 
        color: '#FFD700', // Gold
        message: 'Incredible work! You have a sharp eye for clues. ✨' 
      };
    } else if (finalScore >= 70) {
      return { 
        label: 'Senior Sleuth', 
        icon: Medal, 
        color: '#94A3B8', // Silver
        message: 'Great job! You are well on your way to being a pro. 🔍' 
      };
    } else {
      return { 
        label: 'Junior Agent', 
        icon: Star, 
        color: '#CD7F32', // Bronze
        message: 'Good start! Keep practicing to sharpen your skills. 🧪' 
      };
    }
  };

  const results = getResultsData();
  const BadgeIcon = results.icon;

  return (
    <View style={styles.container}>
      {/* Fixes invisible icons on light background */}
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        <Text style={styles.congrats}>Case Closed!</Text>
        
        {/* Display name from Context */}
        <Text style={styles.nameText}>Junior Detective {userName || 'Hero'}</Text>

        <View style={styles.resultCard}>
          <View style={[styles.badgeCircle, { borderColor: results.color }]}>
            <BadgeIcon size={80} color={results.color} />
          </View>

          <Text style={[styles.badgeLabel, { color: results.color }]}>{results.label}</Text>
          <View style={styles.scoreBadge}>
             <Text style={styles.scoreText}>Score: {finalScore}%</Text>
          </View>
          <Text style={styles.messageText}>{results.message}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable 
          style={styles.homeButton} 
          onPress={() => router.push('/')}
        >
          <Home size={20} color="white" style={{ marginRight: 10 }} />
          <Text style={styles.homeButtonText}>New Investigation</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: ACADEMY_COLORS.background, 
    padding: 24 
  },
  content: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  congrats: { 
    fontSize: 38, 
    fontWeight: '900', 
    color: ACADEMY_COLORS.text, 
    marginBottom: 5,
    letterSpacing: 1
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: ACADEMY_COLORS.softGrey,
    marginBottom: 30,
    textAlign: 'center'
  },
  resultCard: {
    backgroundColor: ACADEMY_COLORS.white,
    width: '100%',
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  badgeCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 6,
    backgroundColor: '#F8FAFC',
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 20,
  },
  badgeLabel: { 
    fontSize: 26, 
    fontWeight: '900', 
    marginBottom: 10 
  },
  scoreBadge: {
    backgroundColor: '#E6FFFA',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 20,
  },
  scoreText: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: ACADEMY_COLORS.mint, 
  },
  messageText: {
    fontSize: 16,
    color: ACADEMY_COLORS.text,
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 24,
    fontWeight: '500'
  },
  footer: {
    marginBottom: 20,
  },
  homeButton: {
    backgroundColor: ACADEMY_COLORS.mint,
    flexDirection: 'row',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: ACADEMY_COLORS.mint,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  homeButtonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16,
    letterSpacing: 1
  },
});