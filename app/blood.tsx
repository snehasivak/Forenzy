import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import Animated, { 
  FadeIn, 
  useAnimatedStyle, withTiming, useSharedValue, withRepeat, withSequence, 
  runOnJS 
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

export default function BloodLab() {
  const router = useRouter();
  const [completedTests, setCompletedTests] = useState({ KASTLE: false, LUMINOL: false });
  const [isDark, setIsDark] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [testType, setTestType] = useState<'KASTLE' | 'LUMINOL' | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  const dropY = useSharedValue(0);
  const dropOpacity = useSharedValue(0);

  const finishTest = () => {
    setCompletedTests(prev => ({ ...prev, [testType!]: true }));
    setIsAdding(false);
    dropY.value = 0;
    dropOpacity.value = 0;
  };

  const startReagentFlow = () => {
    if (testType === 'LUMINOL' && !isDark) return;
    setIsAdding(true);
    dropY.value = 0;
    dropOpacity.value = 1;

    dropY.value = withRepeat(
      withSequence(
        withTiming(100, { duration: 600 }), 
        withTiming(0, { duration: 0 })      
      ),
      2, 
      false,
      () => { runOnJS(finishTest)(); }
    );
  };

  const animatedDropStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: dropY.value }],
    opacity: dropOpacity.value,
  }));

  useEffect(() => {
    if (completedTests.KASTLE && completedTests.LUMINOL) {
      setTimeout(() => setIsSolved(true), 800);
      setTimeout(() => router.push('/evidences'), 3000);
    }
  }, [completedTests]);

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Academy Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={ACADEMY_COLORS.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && { color: '#FFF' }]}>BLOOD ANALYSIS LAB 🔬</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* REAGENT CHOICE CARD */}
        <View style={styles.selectionCard}>
          <TouchableOpacity 
            style={[styles.choiceBtn, testType === 'KASTLE' && { backgroundColor: ACADEMY_COLORS.purple }]} 
            onPress={() => {setTestType('KASTLE'); setIsDark(false);}}
          >
            <Ionicons name="flask" size={24} color="white" />
            <Text style={styles.choiceText}>K-Meyer Test</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.choiceBtn, testType === 'LUMINOL' && { backgroundColor: ACADEMY_COLORS.mint }]} 
            onPress={() => setTestType('LUMINOL')}
          >
            <Ionicons name="color-filter" size={24} color="white" />
            <Text style={styles.choiceText}>Luminol Test</Text>
          </TouchableOpacity>
        </View>

        {testType && (
          <View style={styles.labArea}>
            {testType === 'LUMINOL' && (
              <TouchableOpacity style={styles.darkToggle} onPress={() => setIsDark(!isDark)}>
                <Ionicons name={isDark ? "sunny" : "moon"} size={20} color="white" />
                <Text style={styles.darkToggleText}>{isDark ? "LIGHTS ON" : "DARK ROOM"}</Text>
              </TouchableOpacity>
            )}

            <View style={[styles.canvas, isDark && styles.canvasDark]}>
              
              {/* THE DROPPER */}
              <View style={styles.dropperContainer}>
                <Ionicons name="eyedrop" size={50} color={isDark ? "#FFF" : ACADEMY_COLORS.softGrey} />
                
                {/* THE FALLING DROP */}
                <Animated.View style={[
                  styles.fallingDrop, 
                  animatedDropStyle, 
                  { backgroundColor: testType === 'KASTLE' ? '#FF1493' : '#00E5FF' }
                ]} />
              </View>

              {/* THE SAMPLE (Fixed Position) */}
              <View style={styles.samplePosition}>
                <Ionicons 
                  name="water" 
                  size={120} 
                  color={
                    completedTests[testType] 
                      ? (testType === 'KASTLE' ? '#FF1493' : '#00E5FF') 
                      : (isDark ? '#334155' : '#D1D5DB') 
                  } 
                />
                <Text style={[styles.label, { color: isDark ? ACADEMY_COLORS.softGrey : '#94A3B8' }]}>
                  {completedTests[testType] ? "POSITIVE RESULT ✨" : "UNKNOWN SAMPLE 🔍"}
                </Text>
              </View>

            </View>

            <TouchableOpacity 
              style={[styles.actionBtn, (testType === 'LUMINOL' && !isDark) && { opacity: 0.3 }]} 
              onPress={startReagentFlow}
              disabled={isAdding || (testType === 'LUMINOL' && !isDark)}
            >
              <Text style={styles.actionBtnText}>
                {isAdding ? "ANALYZING..." : `ADD ${testType} REAGENT`}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* SUCCESS OVERLAY */}
      {isSolved && (
        <Animated.View entering={FadeIn} style={styles.overlay}>
           <Ionicons name="checkmark-done-circle" size={120} color={ACADEMY_COLORS.mint} />
           <Text style={styles.overlayTitle}>SAMPLES MATCHED!</Text>
           <Text style={styles.overlaySub}>Great work, Detective! ✨</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ACADEMY_COLORS.background },
  containerDark: { backgroundColor: '#020617' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 60 },
  headerTitle: { fontSize: 20, fontWeight: '900', marginLeft: 15, color: ACADEMY_COLORS.text },
  scrollContent: { padding: 20 },
  backBtn: { padding: 10, backgroundColor: 'white', borderRadius: 12, elevation: 2 },
  
  selectionCard: { backgroundColor: ACADEMY_COLORS.white, borderRadius: 25, padding: 15, flexDirection: 'row', gap: 10, marginBottom: 20, elevation: 3 },
  choiceBtn: { flex: 1, padding: 20, borderRadius: 20, alignItems: 'center', backgroundColor: ACADEMY_COLORS.softGrey },
  choiceText: { color: 'white', fontWeight: 'bold', fontSize: 12, marginTop: 8 },

  labArea: { alignItems: 'center', width: '100%' },
  darkToggle: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: ACADEMY_COLORS.text, padding: 12, borderRadius: 25, marginBottom: 15 },
  darkToggleText: { color: 'white', fontWeight: '900', fontSize: 12 },
  
  canvas: { width: '100%', height: 350, backgroundColor: 'white', borderRadius: 30, borderWidth: 2, borderColor: '#E2E8F0', position: 'relative', elevation: 2 },
  canvasDark: { backgroundColor: '#000', borderColor: '#1e293b' },
  
  dropperContainer: { position: 'absolute', top: 30, left: 0, right: 0, alignItems: 'center', zIndex: 20 },
  fallingDrop: { width: 10, height: 20, borderRadius: 5, position: 'absolute', top: 45 },

  samplePosition: { position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center', zIndex: 10 },
  label: { fontSize: 12, fontWeight: '900', marginTop: 15 },

  actionBtn: { backgroundColor: ACADEMY_COLORS.mint, padding: 22, borderRadius: 20, width: '100%', marginTop: 25, alignItems: 'center', elevation: 5 },
  actionBtnText: { color: 'white', fontWeight: '900', fontSize: 16, letterSpacing: 1 },

  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(240, 249, 255, 0.98)', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
  overlayTitle: { color: ACADEMY_COLORS.text, fontSize: 28, fontWeight: '900', marginTop: 20 },
  overlaySub: { color: ACADEMY_COLORS.softGrey, fontSize: 18, marginTop: 5 }
});