import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, ZoomIn, FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
      setTimeout(() => {
        router.push('/evidences'); 
      }, 2500);
    } else {
      Alert.alert("❌ ANALYSIS ERROR", option.reason);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      
      {/* Academy Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={ACADEMY_COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GLASS FRACTURE LAB 🔬</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* STEP 0: THE DIAGRAM */}
        <Animated.View entering={FadeInDown} style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>🔍 Evidence Scan</Text>
          <Image 
            source={require('../assets/images/glass_diagram.jpg')} 
            style={styles.mainDiagram}
            resizeMode="contain"
          />
          {step === 0 && (
            <TouchableOpacity style={styles.nextBtn} onPress={() => setStep(1)}>
              <Text style={styles.nextBtnText}>IDENTIFY PATTERNS</Text>
              <MaterialCommunityIcons name="magnify" size={20} color="white" />
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* STEP 1: DEFINITIONS */}
        {step >= 1 && (
          <Animated.View entering={FadeInDown} style={styles.sectionCard}>
            <Text style={[styles.sectionTitle, { color: ACADEMY_COLORS.purple }]}>🎯 Fracture Types</Text>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <Ionicons name="sunny" size={18} color={ACADEMY_COLORS.mint} />
                <Text style={styles.legendText}><Text style={styles.bold}>RADIAL:</Text> Outward lines.</Text>
              </View>
              <View style={styles.legendItem}>
                <Ionicons name="radio-button-off" size={18} color={ACADEMY_COLORS.yellow} />
                <Text style={styles.legendText}><Text style={styles.bold}>CONCENTRIC:</Text> Circular rings.</Text>
              </View>
            </View>
            {step === 1 && (
              <TouchableOpacity style={[styles.nextBtn, { backgroundColor: ACADEMY_COLORS.yellow }]} onPress={() => setStep(2)}>
                <Text style={[styles.nextBtnText, { color: ACADEMY_COLORS.text }]}>VIEW IMPACT ANALYSIS</Text>
                <MaterialCommunityIcons name="shield-search" size={20} color={ACADEMY_COLORS.text} />
              </TouchableOpacity>
            )}
          </Animated.View>
        )}

        {/* STEP 2: THE 4R RULE */}
        {step >= 2 && (
          <Animated.View entering={FadeInDown} style={[styles.sectionCard, styles.logicCard]}>
            <Text style={[styles.sectionTitle, { color: '#2C7A7B' }]}>🕵️ The "4R" Rule</Text>
            <View style={styles.ruleBox}>
              <Text style={styles.ruleItem}>
                <Text style={styles.boldText}><Text style={styles.highlight}>R</Text>adial cracks form <Text style={styles.highlight}>R</Text>ight angles on the <Text style={styles.highlight}>R</Text>ear side of <Text style={styles.highlight}>R</Text>adiating impact.</Text>
              </Text>
            </View>
            {step === 2 && (
              <TouchableOpacity style={[styles.nextBtn, { backgroundColor: ACADEMY_COLORS.mint }]} onPress={() => setStep(3)}>
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
                {isSolved && <Ionicons name="checkmark-circle" size={24} color={ACADEMY_COLORS.mint} />}
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
              The microscope shows right-angle ridges touching <Text style={styles.boldText}>Side B</Text>. Where did the impact come from?
            </Text>
            
            <View style={styles.optionsGrid}>
              {CHALLENGE_OPTIONS.map((opt) => (
                <TouchableOpacity 
                  key={opt.id}
                  disabled={isSolved}
                  style={[
                    styles.optionBtn,
                    selectedAnswer === opt.id && { borderColor: opt.correct ? ACADEMY_COLORS.mint : '#FF4444' }
                  ]}
                  onPress={() => handleAnswer(opt)}
                >
                  <Text style={styles.optionText}>{opt.text}</Text>
                  {selectedAnswer === opt.id && (
                    <Ionicons 
                      name={opt.correct ? "checkmark-circle" : "close-circle"} 
                      size={20} 
                      color={opt.correct ? ACADEMY_COLORS.mint : '#FF4444'} 
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
            <MaterialCommunityIcons name="seal-variant" size={120} color={ACADEMY_COLORS.mint} />
          </Animated.View>
          <Text style={styles.successTitle}>MISSION COMPLETE</Text>
          <Text style={styles.successSubtitle}>Glass analysis secured! ✨</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ACADEMY_COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
  backBtn: { padding: 8, backgroundColor: 'white', borderRadius: 10, elevation: 2 },
  headerTitle: { color: ACADEMY_COLORS.text, fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: { color: ACADEMY_COLORS.mint, fontSize: 14, fontWeight: '800', marginBottom: 15, textTransform: 'uppercase' },
  mainDiagram: { width: '100%', height: 200, backgroundColor: '#FFFFFF', borderRadius: 15 },
  
  nextBtn: { 
    backgroundColor: ACADEMY_COLORS.mint, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 15, 
    marginTop: 20,
    gap: 10 
  },
  nextBtnText: { color: 'white', fontWeight: '900', fontSize: 13 },

  legendRow: { gap: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  legendText: { color: ACADEMY_COLORS.softGrey, fontSize: 14 },
  bold: { fontWeight: '900', color: ACADEMY_COLORS.text },

  logicCard: { backgroundColor: '#E6FFFA', borderColor: ACADEMY_COLORS.mint, borderWidth: 1 },
  ruleBox: { padding: 15, backgroundColor: 'white', borderRadius: 15 },
  ruleItem: { color: ACADEMY_COLORS.text, fontSize: 15, lineHeight: 22 },
  highlight: { color: ACADEMY_COLORS.mint, fontWeight: '900' },
  boldText: { fontWeight: '700' },

  challengeCard: { backgroundColor: 'white', borderRadius: 25, padding: 20, borderWidth: 2, borderColor: ACADEMY_COLORS.mint },
  solvedCard: { borderColor: ACADEMY_COLORS.mint },
  challengeHeader: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 15 },
  challengeTitle: { color: ACADEMY_COLORS.mint, fontWeight: '900', fontSize: 12, letterSpacing: 1 },
  
  imageFrame: { width: '100%', height: 180, backgroundColor: '#F8FAFC', borderRadius: 15, marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#E2E8F0' },
  challengeImage: { width: '100%', height: '100%' },
  label: { position: 'absolute', top: '40%', backgroundColor: ACADEMY_COLORS.mint, padding: 6, borderRadius: 8 },
  labelTxt: { color: '#FFF', fontSize: 10, fontWeight: '900' },
  
  questionText: { color: ACADEMY_COLORS.text, textAlign: 'center', marginBottom: 20, fontWeight: '600', lineHeight: 22 },
  
  optionsGrid: { gap: 10 },
  optionBtn: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#F8FAFC', 
    padding: 16, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#E2E8F0' 
  },
  optionText: { color: ACADEMY_COLORS.text, fontWeight: 'bold', flex: 1 },

  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(240, 249, 255, 0.98)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  successTitle: { color: ACADEMY_COLORS.text, fontSize: 32, fontWeight: '900', marginTop: 20, letterSpacing: 2 },
  successSubtitle: { color: ACADEMY_COLORS.softGrey, fontSize: 16, marginTop: 10, textAlign: 'center' },
});