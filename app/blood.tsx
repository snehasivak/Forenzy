import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import Animated, { 
  FadeIn, 
  useAnimatedStyle, withTiming, useSharedValue, withRepeat, withSequence, 
  runOnJS 
} from 'react-native-reanimated';

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={isDark ? "#FFF" : "#000"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && { color: '#FFF' }]}>BLOOD LAB</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* REAGENT CHOICE */}
        <View style={styles.selectionCard}>
          <TouchableOpacity 
            style={[styles.choiceBtn, testType === 'KASTLE' && styles.choiceBtnActive]} 
            onPress={() => {setTestType('KASTLE'); setIsDark(false);}}
          >
            <Ionicons name="flask" size={24} color="white" />
            <Text style={styles.choiceText}>K-Meyer</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.choiceBtn, testType === 'LUMINOL' && styles.choiceBtnActive]} 
            onPress={() => setTestType('LUMINOL')}
          >
            <Ionicons name="color-filter" size={24} color="white" />
            <Text style={styles.choiceText}>Luminol</Text>
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
                <Ionicons name="eyedrop" size={50} color={isDark ? "#FFF" : "#475569"} />
                
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
                      : (isDark ? '#1e293b' : '#450a0a') // visible dark grey in dark mode
                  } 
                />
                <Text style={[styles.label, { color: isDark ? '#475569' : '#94A3B8' }]}>
                  {completedTests[testType] ? "POSITIVE" : "UNKNOWN SAMPLE"}
                </Text>
              </View>

            </View>

            <TouchableOpacity 
              style={[styles.actionBtn, (testType === 'LUMINOL' && !isDark) && { opacity: 0.2 }]} 
              onPress={startReagentFlow}
              disabled={isAdding || (testType === 'LUMINOL' && !isDark)}
            >
              <Text style={styles.actionBtnText}>
                {isAdding ? "DROPPING..." : `ADD ${testType}`}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {isSolved && (
        <Animated.View entering={FadeIn} style={styles.overlay}>
           <Ionicons name="checkmark-done-circle" size={100} color="#4CAF50" />
           <Text style={styles.overlayTitle}>SAMPLES MATCH</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  containerDark: { backgroundColor: '#020617' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 60 },
  headerTitle: { fontSize: 20, fontWeight: '900', marginLeft: 15 },
  scrollContent: { padding: 20 },
  backBtn: { padding: 8, backgroundColor: '#E2E8F0', borderRadius: 10 },
  
  selectionCard: { backgroundColor: '#1E293B', borderRadius: 16, padding: 15, flexDirection: 'row', gap: 10, marginBottom: 20 },
  choiceBtn: { flex: 1, padding: 15, borderRadius: 12, alignItems: 'center', backgroundColor: '#334155' },
  choiceBtnActive: { backgroundColor: '#0284C7', borderWidth: 1, borderColor: 'white' },
  choiceText: { color: 'white', fontWeight: 'bold', fontSize: 11, marginTop: 5 },

  labArea: { alignItems: 'center', width: '100%' },
  darkToggle: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#334155', padding: 12, borderRadius: 25, marginBottom: 15 },
  darkToggleText: { color: 'white', fontWeight: '900', fontSize: 12 },
  
  canvas: { width: '100%', height: 350, backgroundColor: 'white', borderRadius: 24, borderWidth: 2, borderColor: '#E2E8F0', position: 'relative' },
  canvasDark: { backgroundColor: '#000', borderColor: '#1e293b' },
  
  dropperContainer: { position: 'absolute', top: 20, left: 0, right: 0, alignItems: 'center', zIndex: 20 },
  fallingDrop: { width: 10, height: 20, borderRadius: 5, position: 'absolute', top: 45 },

  samplePosition: { position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center', zIndex: 10 },
  label: { fontSize: 10, fontWeight: '900', marginTop: 10 },

  actionBtn: { backgroundColor: '#0F172A', padding: 20, borderRadius: 16, width: '100%', marginTop: 20, alignItems: 'center' },
  actionBtnText: { color: 'white', fontWeight: '900' },

  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(15, 23, 42, 0.98)', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
  overlayTitle: { color: '#4CAF50', fontSize: 22, fontWeight: '900', marginTop: 20 }
});