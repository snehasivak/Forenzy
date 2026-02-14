import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, BounceIn, ZoomIn, FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GlassLab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [step, setStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  const CHALLENGE_OPTIONS = [
    { id: 1, text: "From Side A (Impacted Side)", correct: true, reason: "Correct! The 'L' shaped ridges are on Side B, which means Side B is the REAR. Therefore, the hit came from the front (Side A)." },
    { id: 2, text: "From Side B (Rear Side)", correct: false, reason: "Incorrect. The 4R rule states right angles form on the REAR. Since the angles are on Side B, that's the back!" },
    { id: 3, text: "It was hit from both sides", correct: false, reason: "Physics only allows one primary impact point to create this specific rib pattern." },
    { id: 4, text: "Impossible to determine", correct: false, reason: "Incorrect. Detectives use the '4R Rule' specifically to solve this mystery!" }
  ];

  const handleAnswer = (option: typeof CHALLENGE_OPTIONS[0]) => {
    setSelectedAnswer(option.id);
    if (option.correct) {
      setIsSolved(true);
      // Navigate back to the evidence list after the animation
      setTimeout(() => {
        router.push('/evidences'); 
      }, 2500);
    } else {
      Alert.alert("❌ ANALYSIS ERROR", option.reason);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GLASS FRACTURE LAB</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* STEP 0: THE DIAGRAM */}
        <Animated.View entering={FadeInDown} style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>🔬 Evidence Scan</Text>
          <Image 
            source={require('../assets/images/glass_diagram.jpg')} 
            style={styles.mainDiagram}
            resizeMode="contain"
          />
          {step === 0 && (
            <TouchableOpacity style={styles.nextBtn} onPress={() => setStep(1)}>
              <Text style={styles.nextBtnText}>IDENTIFY PATTERNS</Text>
              <MaterialCommunityIcons name="magnify" size={20} color="#0F172A" />
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* STEP 1: DEFINITIONS */}
        {step >= 1 && (
          <Animated.View entering={FadeInDown} style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>🎯 Fracture Types</Text>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <Ionicons name="sunny" size={18} color={Colors.primary} />
                <Text style={styles.legendText}><Text style={styles.bold}>RADIAL:</Text> Outward lines.</Text>
              </View>
              <View style={styles.legendItem}>
                <Ionicons name="radio-button-off" size={18} color="#FFD93D" />
                <Text style={styles.legendText}><Text style={styles.bold}>CONCENTRIC:</Text> Circular rings.</Text>
              </View>
            </View>
            {step === 1 && (
              <TouchableOpacity style={[styles.nextBtn, { backgroundColor: '#FFD93D' }]} onPress={() => setStep(2)}>
                <Text style={styles.nextBtnText}>VIEW IMPACT ANALYSIS</Text>
                <MaterialCommunityIcons name="shield-search" size={20} color="#0F172A" />
              </TouchableOpacity>
            )}
          </Animated.View>
        )}

        {/* STEP 2: THE 4R RULE */}
        {step >= 2 && (
          <Animated.View entering={FadeInDown} style={[styles.sectionCard, styles.logicCard]}>
            <Text style={styles.sectionTitle}>🕵️ The "4R" Rule</Text>
            <View style={styles.ruleBox}>
              <Text style={styles.ruleItem}>
                <Text style={styles.bold}>R</Text>adial cracks form <Text style={styles.bold}>R</Text>ight angles on the <Text style={styles.bold}>R</Text>ear side of <Text style={styles.bold}>R</Text>adiating impact.
              </Text>
            </View>
            {step === 2 && (
              <TouchableOpacity style={[styles.nextBtn, { backgroundColor: '#4CAF50' }]} onPress={() => setStep(3)}>
                <Text style={styles.nextBtnText}>START FIELD TEST</Text>
                <MaterialCommunityIcons name="sword-cross" size={20} color="white" />
              </TouchableOpacity>
            )}
          </Animated.View>
        )}

        {/* STEP 3: THE MCQ CHALLENGE */}
        {step >= 3 && (
          <Animated.View entering={ZoomIn} style={[styles.challengeCard, isSolved && styles.solvedCard]}>
            <View style={styles.challengeHeader}>
                <Text style={styles.challengeTitle}>🚨 FIELD TEST: SIDE VIEW SCAN</Text>
                {isSolved && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
            </View>
            
            <View style={styles.imageFrame}>
               <Image 
                source={require('../assets/images/glass.jpg')} 
                style={styles.challengeImage}
                resizeMode="contain"
              />
              <View style={[styles.label, { left: 10 }]}><Text style={styles.labelTxt}>SIDE A</Text></View>
              <View style={[styles.label, { right: 10 }]}><Text style={styles.labelTxt}>SIDE B</Text></View>
            </View>

            <Text style={styles.questionText}>
              The microscope shows right-angle ridges touching <Text style={styles.boldWhite}>Side B</Text>. Where did the impact come from?
            </Text>
            
            <View style={styles.optionsGrid}>
              {CHALLENGE_OPTIONS.map((opt) => (
                <TouchableOpacity 
                  key={opt.id}
                  disabled={isSolved}
                  style={[
                    styles.optionBtn,
                    selectedAnswer === opt.id && { borderColor: opt.correct ? '#4CAF50' : '#FF4444' }
                  ]}
                  onPress={() => handleAnswer(opt)}
                >
                  <Text style={styles.optionText}>{opt.text}</Text>
                  {selectedAnswer === opt.id && (
                    <Ionicons 
                      name={opt.correct ? "checkmark-circle" : "close-circle"} 
                      size={20} 
                      color={opt.correct ? '#4CAF50' : '#FF4444'} 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        )}
      </ScrollView>

      {/* SUCCESS OVERLAY */}
      {isSolved && (
        <Animated.View entering={FadeIn.duration(400)} style={styles.successOverlay}>
          <Animated.View entering={ZoomIn.delay(200).springify()}>
            <MaterialCommunityIcons name="seal-variant" size={120} color="#4CAF50" />
          </Animated.View>
          <Animated.Text entering={FadeInDown.delay(400)} style={styles.successTitle}>
            EVIDENCE SECURED
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(600)} style={styles.successSubtitle}>
            Lab analysis complete. Heading back...
          </Animated.Text>
          <View style={styles.loaderBg}>
            <Animated.View entering={FadeInDown.delay(800)} style={styles.loaderBar} />
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  backBtn: { padding: 8, backgroundColor: 'rgba(56, 189, 248, 0.1)', borderRadius: 10 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  
  sectionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.2)',
  },
  sectionTitle: { color: Colors.primary, fontSize: 14, fontWeight: '800', marginBottom: 15, textTransform: 'uppercase' },
  mainDiagram: { width: '100%', height: 200, backgroundColor: '#000', borderRadius: 12 },
  
  nextBtn: { 
    backgroundColor: Colors.primary, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 12, 
    marginTop: 20,
    gap: 10 
  },
  nextBtnText: { color: '#0F172A', fontWeight: '900', fontSize: 13 },

  legendRow: { gap: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  legendText: { color: '#94A3B8', fontSize: 13 },
  bold: { fontWeight: '900', color: '#FFF' },

  logicCard: { backgroundColor: '#162033', borderColor: '#4CAF50' },
  ruleBox: { padding: 15, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 12 },
  ruleItem: { color: '#FFF', fontSize: 14, lineHeight: 22 },

  challengeCard: { backgroundColor: '#1E293B', borderRadius: 20, padding: 20, borderWidth: 2, borderColor: Colors.primary },
  solvedCard: { borderColor: '#4CAF50' },
  challengeHeader: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 15 },
  challengeTitle: { color: Colors.primary, fontWeight: '900', fontSize: 12, letterSpacing: 1 },
  
  imageFrame: { width: '100%', height: 180, backgroundColor: '#FFF', borderRadius: 12, marginBottom: 15, overflow: 'hidden' },
  challengeImage: { width: '100%', height: '100%' },
  label: { position: 'absolute', top: '40%', backgroundColor: 'rgba(56, 189, 248, 0.8)', padding: 5, borderRadius: 4 },
  labelTxt: { color: '#FFF', fontSize: 10, fontWeight: '900' },
  
  questionText: { color: 'white', textAlign: 'center', marginBottom: 20, fontWeight: '600', lineHeight: 20 },
  boldWhite: { color: Colors.primary, fontWeight: '900' },
  
  optionsGrid: { gap: 10 },
  optionBtn: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#0F172A', 
    padding: 16, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#334155' 
  },
  optionText: { color: 'white', fontWeight: 'bold', flex: 1 },

  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.98)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  successTitle: { color: '#4CAF50', fontSize: 32, fontWeight: '900', marginTop: 20, letterSpacing: 2 },
  successSubtitle: { color: '#94A3B8', fontSize: 16, marginTop: 10, textAlign: 'center', paddingHorizontal: 40 },
  loaderBg: { width: 200, height: 4, backgroundColor: '#1E293B', borderRadius: 2, marginTop: 40, overflow: 'hidden' },
  loaderBar: { width: '100%', height: '100%', backgroundColor: '#4CAF50' },
});