import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  FadeIn, 
  ZoomIn, 
  FlipInYRight, 
  Shake // Some versions support Shake, otherwise we use key-based triggers
} from 'react-native-reanimated';

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
      color: "#38BDF8",
    },
    { 
      title: "THE WHORL", 
      image: require('../assets/images/whorl.png'), 
      desc: "These look like circles or a spiral. They spin like a whirlpool!",
      color: "#A855F7",
    },
    { 
      title: "THE ARCH", 
      image: require('../assets/images/arch.png'), 
      desc: "The lines enter from one side and rise up like a little hill.",
      color: "#FACC15",
    }
  ];

  // QUIZ DATA
  const quizQuestions = [
    { type: 'WHORL', image: require('../assets/images/whorl_test.jpg') },
    { type: 'ARCH', image: require('../assets/images/arch_test.jpg') },
    { type: 'LOOP', image: require('../assets/images/loop_test.png') }
  ];

  const handleQuizAnswer = (type: string) => {
    if (feedback !== 'IDLE') return; // Prevent double-tapping

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
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PATTERN ACADEMY</Text>
      </View>

      <ScrollView contentContainerStyle={styles.main}>
        
        {/* PHASE 1: LEARN */}
        {gameState === 'LEARN' && (
          <View style={styles.fullWidth}>
            <Text style={styles.subHeader}>STEP 1: MEMORIZE THE SHAPES</Text>
            
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
                <Ionicons name="arrow-back-circle" size={45} color="white" />
              </TouchableOpacity>
              
              {currentCard < patterns.length - 1 ? (
                <TouchableOpacity onPress={() => setCurrentCard(currentCard + 1)} style={styles.navBtn}>
                  <Ionicons name="arrow-forward-circle" size={45} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setGameState('QUIZ')} style={styles.startQuizBtn}>
                  <Text style={styles.startQuizText}>START QUIZ</Text>
                  <Ionicons name="play" size={18} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* PHASE 2: QUIZ */}
        {gameState === 'QUIZ' && (
          <View style={styles.fullWidth}>
            <Text style={styles.subHeader}>STEP 2: IDENTIFY THE PRINT</Text>
            
            <View style={styles.quizZone}>
               <Text style={styles.quizProgress}>Question {quizStep + 1} of 3</Text>
               
               {/* Feedback dynamic styling */}
               <Animated.View 
                 key={quizStep + feedback} // Re-triggers animation on feedback change
                 entering={ZoomIn} 
                 style={[
                    styles.quizImageFrame,
                    feedback === 'WRONG' && styles.frameWrong,
                    feedback === 'CORRECT' && styles.frameCorrect
                 ]}
               >
                  <Image source={quizQuestions[quizStep].image} style={styles.patternImage} resizeMode="contain" />
                  
                  {/* Status Overlay */}
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
             <Ionicons name="ribbon" size={80} color="#FACC15" />
             <Text style={styles.successTitle}>CERTIFIED DETECTIVE</Text>
             <Text style={styles.successBody}>You identified all patterns correctly!</Text>
             <TouchableOpacity style={styles.finishBtn} onPress={() => router.push('/evidences')}>
                <Text style={styles.finishBtnText}>LOG EVIDENCE</Text>
             </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 60 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: '900', marginLeft: 15 },
  backBtn: { padding: 8, backgroundColor: '#1E293B', borderRadius: 12 },
  main: { padding: 20, alignItems: 'center' },
  fullWidth: { width: '100%', alignItems: 'center' },
  subHeader: { color: '#38BDF8', fontSize: 12, fontWeight: '900', letterSpacing: 1, marginBottom: 20 },

  card: { width: '100%', backgroundColor: 'white', borderRadius: 30, padding: 25, alignItems: 'center' },
  imageFrame: { width: '100%', height: 250, backgroundColor: '#F8FAFC', borderRadius: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center' },
  patternImage: { width: '80%', height: '80%' },
  cardTitle: { fontSize: 24, fontWeight: '900', marginBottom: 10 },
  cardDesc: { textAlign: 'center', color: '#64748B', fontSize: 14 },

  navRow: { flexDirection: 'row', alignItems: 'center', marginTop: 25, gap: 20 },
  navBtn: { padding: 5 },
  startQuizBtn: { backgroundColor: '#38BDF8', flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 20 },
  startQuizText: { color: 'white', fontWeight: '900' },

  quizZone: { width: '100%', alignItems: 'center', marginBottom: 25 },
  quizProgress: { color: '#94A3B8', fontWeight: 'bold', marginBottom: 10 },
  quizImageFrame: { width: 240, height: 240, backgroundColor: 'white', borderRadius: 120, padding: 30, borderWidth: 4, borderColor: '#1E293B', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  frameWrong: { borderColor: '#EF4444' },
  frameCorrect: { borderColor: '#10B981' },
  
  feedbackOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  feedbackText: { fontWeight: '900', fontSize: 14, marginTop: 8 },

  scannerLine: { position: 'absolute', width: '100%', height: 3, backgroundColor: 'rgba(56, 189, 248, 0.4)', top: '50%' },
  answerGrid: { width: '100%', gap: 12 },
  answerBtn: { backgroundColor: '#1E293B', padding: 18, borderRadius: 15, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  answerBtnText: { color: 'white', fontWeight: '900', letterSpacing: 2 },

  successCard: { width: '100%', alignItems: 'center', padding: 30, backgroundColor: '#0F172A', borderRadius: 30, borderWidth: 2, borderColor: '#FACC15' },
  successTitle: { color: 'white', fontSize: 22, fontWeight: '900', marginTop: 15 },
  successBody: { color: '#94A3B8', textAlign: 'center', marginTop: 5 },
  finishBtn: { backgroundColor: '#FACC15', width: '100%', padding: 18, borderRadius: 15, marginTop: 25, alignItems: 'center' },
  finishBtnText: { color: '#020617', fontWeight: '900' }
});