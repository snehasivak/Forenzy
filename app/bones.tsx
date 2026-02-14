import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, ZoomIn, FadeOut, SlideInUp } from 'react-native-reanimated';

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

export default function BonesLab() {
  const router = useRouter();
  const [showBriefing, setShowBriefing] = useState(true);
  const [analyzed, setAnalyzed] = useState<{ [key: string]: boolean }>({});
  const [isAdultPhase, setIsAdultPhase] = useState(false);

  const sutures = [
    { id: 'top', label: 'Coronal', top: '25%', left: '46%' },
    { id: 'mid', label: 'Sagittal', top: '45%', left: '46%' },
    { id: 'back', label: 'Lambdoid', top: '65%', left: '46%' },
  ];

  const handlePress = (id: string) => {
    if (isAdultPhase) return;

    const newAnalyzed = { ...analyzed, [id]: true };
    setAnalyzed(newAnalyzed);

    if (Object.keys(newAnalyzed).length === 3) {
      setTimeout(() => {
        setIsAdultPhase(true);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 1. BRIEFING OVERLAY */}
      {showBriefing && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.briefingOverlay}>
          <Animated.View entering={SlideInUp.duration(500)} style={styles.briefingCard}>
            <Text style={styles.briefingTitle}>SUTURE DIAGRAM</Text>
            <View style={styles.imageContainer}>
              <Image 
                source={require('../assets/images/sutures.jpg')} 
                style={styles.briefingImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                Identify the growth gaps on the baby's skull to see how they fuse as we get older! 🧠
              </Text>
            </View>
            <TouchableOpacity style={styles.startBtn} onPress={() => setShowBriefing(false)}>
              <Text style={styles.startBtnText}>START MISSION 🚀</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      )}

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={ACADEMY_COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SKULL GROWTH LAB</Text>
      </View>

      <ScrollView contentContainerStyle={styles.main}>
        
        {/* INSTRUCTION TEXT */}
        <View style={styles.instructionBox}>
           <Text style={styles.instructionMain}>
             {isAdultPhase ? "OBSERVE ADULT FUSION ✨" : "SCAN INFANT GAPS 🔍"}
           </Text>
           <Text style={styles.instructionSub}>
             {isAdultPhase 
                ? "Notice how the red dots are gone? The bones have joined together!" 
                : "Tap the 3 medical icons to analyze the skull gaps."}
           </Text>
        </View>

        {/* SCAN AREA */}
        <View style={[styles.scanArea, isAdultPhase && styles.scanAreaAdult]}>
          <Ionicons 
            name="skull" 
            size={280} 
            color={isAdultPhase ? ACADEMY_COLORS.mint : ACADEMY_COLORS.text} 
            style={styles.skullBg} 
          />

          {sutures.map((s) => (
            <View key={s.id} style={[styles.marker, { top: s.top as any, left: s.left as any }]}>
              {!isAdultPhase ? (
                <TouchableOpacity onPress={() => handlePress(s.id)} style={styles.markerGroup}>
                   <Animated.View entering={ZoomIn} style={[styles.dot, analyzed[s.id] && styles.dotFound]}>
                     <Ionicons name={analyzed[s.id] ? "checkmark" : "medical"} size={14} color="white" />
                   </Animated.View>
                </TouchableOpacity>
              ) : (
                <Animated.View entering={FadeIn} style={styles.fusedContainer}>
                  <View style={styles.fusedLine} />
                </Animated.View>
              )}
            </View>
          ))}
        </View>

        {/* FINISH CARD */}
        {isAdultPhase && (
          <Animated.View entering={ZoomIn} style={styles.finishCard}>
             <View style={styles.successIcon}>
                <Ionicons name="ribbon" size={40} color="white" />
             </View>
             <Text style={styles.finishTitle}>GROWTH MATCHED</Text>
             <Text style={styles.finishBody}>
               You discovered that infants have open sutures while adults have fused ones!
             </Text>
             <TouchableOpacity style={styles.logBtn} onPress={() => router.push('/evidences')}>
               <Text style={styles.logBtnText}>FINISH & LOG EVIDENCE ✨</Text>
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
  backBtn: { padding: 8, backgroundColor: 'white', borderRadius: 12, elevation: 2 },
  main: { padding: 20, alignItems: 'center' },

  briefingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(240, 249, 255, 0.95)', zIndex: 100, justifyContent: 'center', padding: 20 },
  briefingCard: { backgroundColor: 'white', borderRadius: 30, padding: 25, alignItems: 'center', elevation: 5 },
  briefingTitle: { fontSize: 14, fontWeight: '900', color: ACADEMY_COLORS.softGrey, letterSpacing: 2, marginBottom: 15 },
  imageContainer: { width: '100%', height: 200, backgroundColor: '#F8FAFC', borderRadius: 20, overflow: 'hidden', marginBottom: 15 },
  briefingImage: { width: '100%', height: '100%' },
  infoBox: { padding: 15, backgroundColor: ACADEMY_COLORS.background, borderRadius: 15, marginBottom: 20 },
  infoText: { textAlign: 'center', color: ACADEMY_COLORS.text, fontSize: 14, fontWeight: '500' },
  startBtn: { backgroundColor: ACADEMY_COLORS.mint, width: '100%', padding: 18, borderRadius: 15, alignItems: 'center', elevation: 3 },
  startBtnText: { color: 'white', fontWeight: '900' },

  instructionBox: { width: '100%', marginBottom: 20, alignItems: 'center' },
  instructionMain: { color: ACADEMY_COLORS.mint, fontWeight: '900', fontSize: 18, letterSpacing: 1 },
  instructionSub: { color: ACADEMY_COLORS.softGrey, fontSize: 13, textAlign: 'center', marginTop: 5 },

  scanArea: { width: '100%', height: 400, backgroundColor: 'white', borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#E2E8F0', elevation: 3 },
  scanAreaAdult: { borderColor: ACADEMY_COLORS.mint, backgroundColor: '#E6FFFA' },
  skullBg: { opacity: 0.15 },
  
  marker: { position: 'absolute' },
  markerGroup: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#FF6B6B', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FFE3E3' },
  dotFound: { backgroundColor: ACADEMY_COLORS.mint, borderColor: '#B2F5EA' },
  
  fusedContainer: { alignItems: 'center', justifyContent: 'center' },
  fusedLine: { width: 35, height: 5, backgroundColor: ACADEMY_COLORS.mint, borderRadius: 3 },

  finishCard: { marginTop: 20, backgroundColor: 'white', padding: 25, borderRadius: 30, width: '100%', alignItems: 'center', elevation: 10 },
  successIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: ACADEMY_COLORS.yellow, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  finishTitle: { color: ACADEMY_COLORS.text, fontWeight: '900', fontSize: 20 },
  finishBody: { color: ACADEMY_COLORS.softGrey, fontSize: 14, textAlign: 'center', marginVertical: 15, lineHeight: 20 },
  logBtn: { backgroundColor: ACADEMY_COLORS.mint, width: '100%', padding: 18, borderRadius: 20, alignItems: 'center', elevation: 3 },
  logBtnText: { color: 'white', fontWeight: '900' }
});