import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  FadeIn, 
  ZoomIn, 
  FlipInYRight
} from 'react-native-reanimated';

// Academy Palette - Consistent with your new theme
const ACADEMY_COLORS = {
  background: '#F0F9FF', 
  text: '#2D3436',       
  mint: '#4ECDC4',    
  yellow: '#FFD166',  
  purple: '#A29BFE',   
  white: '#FFFFFF',
  softGrey: '#94A3B8'
};

type GameState = 'LEARN' | 'QUIZ' | 'SUCCESS';
type FeedbackType = 'IDLE' | 'WRONG' | 'CORRECT';

export default function FingerprintLab() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>('LEARN');
  const [currentCard, setCurrentCard] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>('IDLE');

  // FLASHCARD DATA
  const patterns = [
    { 
      title: "THE LOOP", 
      image: require('../assets/images/loop.jpg'), 
      desc: "Lines enter from one side, loop around, and exit the same side.",
      color: ACADEMY_COLORS.mint,
    },
    { 
      title: "THE WHORL", 
      image: require('../assets/images/whorl.png'), 
      desc: "These look like circles or a spiral. They spin like a whirlpool!",
      color: ACADEMY_COLORS.purple,
    },
    { 
      title: "THE ARCH", 
      image: require('../assets/images/arch.png'), 
      desc: "The lines enter from one side and rise up like a little hill.",
      color: ACADEMY_COLORS.yellow,
    }
  ];

  // QUIZ DATA
  const quizQuestions = [
    { type: 'WHORL', image: require('../assets/images/whorl_test.jpg') },
    { type: 'ARCH', image: require('../assets/images/arch_test.jpg') },
    { type: 'LOOP', image: require('../assets/images/loop_test.png') }
  ];

  const handleQuizAnswer = (type: string) => {
    if (feedback !== 'IDLE') return;

    if (type === quizQuestions[quizStep].type) {
      setFeedback('CORRECT');
      setTimeout(() => {
        if (quizStep < quizQuestions.length - 1) {
          setQuizStep(quizStep + 1);
          setFeedback('IDLE');
        } else {
          setGameState('SUCCESS');
        }
      }, 800);
    } else {
      setFeedback('WRONG');
      setTimeout(() => setFeedback('IDLE'), 1000);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={ACADEMY_COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PATTERN ACADEMY</Text>
      </View>

      <ScrollView contentContainerStyle={styles.main}>
        
        {/* PHASE 1: LEARN */}
        {gameState === 'LEARN' && (
          <View style={styles.fullWidth}>
            <Text style={styles.subHeader}>STEP 1: MEMORIZE THE SHAPES 🔍</Text>
            
            <Animated.View key={currentCard} entering={FlipInYRight.duration(600)} style={styles.card}>
              <View style={styles.imageFrame}>
                <Image source={patterns[currentCard].image} style={styles.patternImage} resizeMode="contain" />
              </View>
              <Text style={[styles.cardTitle, { color: patterns[currentCard].color }]}>{patterns[currentCard].title}</Text>
              <Text style={styles.cardDesc}>{patterns[currentCard].desc}</Text>
            </Animated.View>

            <View style={styles.navRow}>
              <TouchableOpacity 
                disabled={currentCard === 0}
                onPress={() => setCurrentCard(currentCard - 1)}
                style={[styles.navBtn, currentCard === 0 && { opacity: 0.3 }]}
              >
                <Ionicons name="arrow-back-circle" size={55} color={ACADEMY_COLORS.text} />
              </TouchableOpacity>
              
              {currentCard < patterns.length - 1 ? (
                <TouchableOpacity onPress={() => setCurrentCard(currentCard + 1)} style={styles.navBtn}>
                  <Ionicons name="arrow-forward-circle" size={55} color={ACADEMY_COLORS.text} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setGameState('QUIZ')} style={styles.startQuizBtn}>
                  <Text style={styles.startQuizText}>START QUIZ 🧠</Text>
                  <Ionicons name="play" size={18} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* PHASE 2: QUIZ */}
        {gameState === 'QUIZ' && (
          <View style={styles.fullWidth}>
            <Text style={styles.subHeader}>STEP 2: IDENTIFY THE PRINT 🕵️</Text>
            
            <View style={styles.quizZone}>
                <Text style={styles.quizProgress}>Question {quizStep + 1} of 3</Text>
                
                <Animated.View 
                  key={quizStep + feedback}
                  entering={ZoomIn} 
                  style={[
                    styles.quizImageFrame,
                    feedback === 'WRONG' && styles.frameWrong,
                    feedback === 'CORRECT' && styles.frameCorrect
                  ]}
                >
                  <Image source={quizQuestions[quizStep].image} style={styles.patternImage} resizeMode="contain" />
                  
                  {feedback !== 'IDLE' && (
                    <Animated.View entering={FadeIn} style={styles.feedbackOverlay}>
                      <Ionicons 
                        name={feedback === 'WRONG' ? "close-circle" : "checkmark-circle"} 
                        size={60} 
                        color={feedback === 'WRONG' ? "#EF4444" : "#10B981"} 
                      />
                      <Text style={[styles.feedbackText, { color: feedback === 'WRONG' ? "#EF4444" : "#10B981" }]}>
                        {feedback === 'WRONG' ? "WRONG PATTERN" : "MATCH FOUND!"}
                      </Text>
                    </Animated.View>
                  )}
                  
                  <View style={styles.scannerLine} />
                </Animated.View>
            </View>

            <View style={styles.answerGrid}>
               {['LOOP', 'WHORL', 'ARCH'].map((type) => (
                 <TouchableOpacity 
                   key={type} 
                   disabled={feedback !== 'IDLE'}
                   style={[styles.answerBtn, feedback !== 'IDLE' && { opacity: 0.5 }]}
                   onPress={() => handleQuizAnswer(type)}
                 >
                   <Text style={styles.answerBtnText}>{type}</Text>
                 </TouchableOpacity>
               ))}
            </View>
          </View>
        )}

        {/* PHASE 3: SUCCESS */}
        {gameState === 'SUCCESS' && (
          <Animated.View entering={ZoomIn} style={styles.successCard}>
             <Ionicons name="ribbon" size={100} color={ACADEMY_COLORS.yellow} />
             <Text style={styles.successTitle}>CERTIFIED DETECTIVE</Text>
             <Text style={styles.successBody}>You identified all patterns correctly!</Text>
             <TouchableOpacity style={styles.finishBtn} onPress={() => router.push('/evidences')}>
                <Text style={styles.finishBtnText}>LOG EVIDENCE ✨</Text>
             </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ACADEMY_COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 60 },
  headerTitle: { color: ACADEMY_COLORS.text, fontSize: 18, fontWeight: '900', marginLeft: 15 },
  backBtn: { padding: 8, backgroundColor: ACADEMY_COLORS.white, borderRadius: 12, elevation: 2 },
  main: { padding: 20, alignItems: 'center' },
  fullWidth: { width: '100%', alignItems: 'center' },
  subHeader: { color: ACADEMY_COLORS.mint, fontSize: 12, fontWeight: '900', letterSpacing: 1, marginBottom: 20 },

  card: { width: '100%', backgroundColor: 'white', borderRadius: 30, padding: 25, alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  imageFrame: { width: '100%', height: 250, backgroundColor: '#F8FAFC', borderRadius: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center' },
  patternImage: { width: '80%', height: '80%' },
  cardTitle: { fontSize: 26, fontWeight: '900', marginBottom: 10 },
  cardDesc: { textAlign: 'center', color: ACADEMY_COLORS.softGrey, fontSize: 15, lineHeight: 22 },

  navRow: { flexDirection: 'row', alignItems: 'center', marginTop: 25, gap: 20 },
  navBtn: { padding: 5 },
  startQuizBtn: { backgroundColor: ACADEMY_COLORS.mint, flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 20, elevation: 5 },
  startQuizText: { color: 'white', fontWeight: '900' },

  quizZone: { width: '100%', alignItems: 'center', marginBottom: 25 },
  quizProgress: { color: ACADEMY_COLORS.softGrey, fontWeight: 'bold', marginBottom: 10 },
  quizImageFrame: { width: 240, height: 240, backgroundColor: 'white', borderRadius: 120, padding: 30, borderWidth: 6, borderColor: 'white', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', elevation: 8 },
  frameWrong: { borderColor: '#EF4444' },
  frameCorrect: { borderColor: '#10B981' },
  
  feedbackOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.92)', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  feedbackText: { fontWeight: '900', fontSize: 14, marginTop: 8 },

  scannerLine: { position: 'absolute', width: '100%', height: 3, backgroundColor: 'rgba(78, 205, 196, 0.4)', top: '50%' },
  answerGrid: { width: '100%', gap: 12 },
  answerBtn: { backgroundColor: ACADEMY_COLORS.white, padding: 18, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', elevation: 2 },
  answerBtnText: { color: ACADEMY_COLORS.text, fontWeight: '900', letterSpacing: 2 },

  successCard: { width: '100%', alignItems: 'center', padding: 30, backgroundColor: 'white', borderRadius: 30, elevation: 10 },
  successTitle: { color: ACADEMY_COLORS.text, fontSize: 24, fontWeight: '900', marginTop: 15 },
  successBody: { color: ACADEMY_COLORS.softGrey, textAlign: 'center', marginTop: 10, fontSize: 16 },
  finishBtn: { backgroundColor: ACADEMY_COLORS.mint, width: '100%', padding: 18, borderRadius: 20, marginTop: 25, alignItems: 'center', elevation: 5 },
  finishBtnText: { color: 'white', fontWeight: '900' }
});