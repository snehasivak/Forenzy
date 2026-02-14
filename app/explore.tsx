import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/constants/Colors';
import { BookOpen, Fingerprint, Construction, CheckCircle } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Reusable Flippable Flashcard Component
const FlippableFlashcard = ({ question, children, color, icon: Icon, fullWidth = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const spin = useSharedValue(0);

  const handleFlip = () => {
    spin.value = withSpring(isFlipped ? 0 : 1);
    setIsFlipped(!isFlipped);
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(spin.value, [0, 1], [0, 180]);
    return { transform: [{ rotateY: `${spinValue}deg` }] };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(spin.value, [0, 1], [180, 360]);
    return { transform: [{ rotateY: `${spinValue}deg` }] };
  });

  return (
    <Pressable style={[styles.flashcardWrapper, { width: fullWidth ? '100%' : '48%', marginTop: fullWidth ? 15 : 0 }]} onPress={handleFlip}>
      {/* Front Side */}
      <Animated.View style={[styles.cardBase, { backgroundColor: color }, frontAnimatedStyle]}>
        <View style={styles.iconCircle}>
          <Icon size={32} color="white" />
        </View>
        <Text style={styles.cardText}>{question}</Text>
        <Text style={styles.tapHint}>Tap to flip!</Text>
      </Animated.View>

      {/* Back Side (Content) */}
      <Animated.View style={[styles.cardBase, styles.cardBack, backAnimatedStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const ExploreCard = ({ title, icon: Icon, color, onPress, widthVal = '48%' }) => (
  <Pressable 
    style={[styles.card, { backgroundColor: color, width: widthVal as any }]} 
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
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </Pressable>

        <Text style={styles.headerTitle}>Learning Lab</Text>
        <Text style={styles.headerSubtitle}>Tap a card to start your training!</Text>

        <View style={styles.grid}>
          {/* FLASHCARD 1: What is Forensics? */}
          <FlippableFlashcard 
            question="What is Forensics?" 
            icon={BookOpen}
            color="#FF6B6B"
          >
            <Text style={styles.answerEmoji}>🕵️‍♂️</Text>
            <Text style={styles.answerText}>Using science to find hidden clues and tell the true story of what happened!</Text>
          </FlippableFlashcard>

          {/* NORMAL CARD: Evidences */}
          <ExploreCard 
            title="Evidences" 
            icon={Fingerprint} 
            color="#4ECDC4" 
            onPress={() => router.push('/evidences')} 
          />
          
          {/* FLASHCARD 2: Do's and Don'ts */}
          {/* FLASHCARD 2: Do's and Don'ts with Larger Text and Emojis */}
          <FlippableFlashcard 
            question="Crime Scene Do's and Don'ts" 
            icon={Construction}
            color="#FFD93D"
            fullWidth={true}
          >
            <View style={styles.dosDontsContainer}>
              {/* Left Column: DO */}
              <View style={styles.column}>
                <Text style={styles.columnTitle}>✅ DO</Text>
                <Text style={styles.columnItem}>🧤 Wear gloves</Text>
                <Text style={styles.columnItem}>📸 Take photos</Text>
                <Text style={styles.columnItem}>🧐 Look closely</Text>
              </View>

              <View style={styles.divider} />

              {/* Right Column: DON'T */}
              <View style={styles.column}>
                <Text style={styles.columnTitle}>❌ DON'T</Text>
                <Text style={styles.columnItem}>🚫 Touch clues</Text>
                <Text style={styles.columnItem}>🍔 Eat snacks</Text>
                <Text style={styles.columnItem}>📦 Move items</Text>
              </View>
            </View>
          </FlippableFlashcard>
        </View>
      </ScrollView>

      <Pressable style={styles.doneButton} onPress={() => router.push('/testmode')}>
        <Text style={styles.doneText}>All done</Text>
        <CheckCircle size={18} color="white" style={{ marginLeft: 6 }} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingTop: 60, paddingBottom: 100 },
  backButton: { marginBottom: 20 },
  headerTitle: { fontSize: 32, fontWeight: '900', color: Colors.text },
  headerSubtitle: { fontSize: 16, color: '#94A3B8', marginBottom: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { padding: 20, borderRadius: 25, alignItems: 'center', justifyContent: 'center', minHeight: 160, elevation: 5 },
  flashcardWrapper: { minHeight: 160 },
  cardBase: { ...StyleSheet.absoluteFillObject, padding: 15, borderRadius: 25, alignItems: 'center', justifyContent: 'center', backfaceVisibility: 'hidden' },
  cardBack: { backgroundColor: '#1E293B', borderWidth: 2, borderColor: Colors.primary },
  iconCircle: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: 15, marginBottom: 8 },
  cardText: { color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
  tapHint: { fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 5, fontWeight: 'bold' },
  answerEmoji: { fontSize: 30, marginBottom: 5 },
  answerText: { color: 'white', fontSize: 13, textAlign: 'center', fontWeight: '600' },
  
  // Do's and Don'ts Layout
  // Updated Do's and Don'ts Layout for better visibility
  dosDontsContainer: { 
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-around', 
    alignItems: 'flex-start',
    paddingVertical: 10 
  },
  column: { 
    alignItems: 'flex-start', // Changed to flex-start for easier reading
    flex: 1,
    paddingHorizontal: 10
  },
  columnTitle: { 
    color: 'white', 
    fontWeight: '900', 
    fontSize: 22, // Increased size
    marginBottom: 15 
  },
  columnItem: { 
    color: '#E2E8F0', // Slightly brighter text
    fontSize: 16, // Increased size from 12 to 16
    fontWeight: '600',
    marginBottom: 8 
  },
  divider: { 
    width: 2, // Slightly thicker divider
    height: '90%', 
    backgroundColor: 'rgba(255,255,255,0.2)' 
  },

  doneButton: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#4CAF50', flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 50 },
  doneText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
});