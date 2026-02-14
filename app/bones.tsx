import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, ZoomIn, FadeOut, SlideInUp } from 'react-native-reanimated';

export default function BonesLab() {
  const router = useRouter();
  const [showBriefing, setShowBriefing] = useState(true);
  const [analyzed, setAnalyzed] = useState<{ [key: string]: boolean }>({});
  
  // Single state to track progress
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

    // When all 3 are found, move to Adult phase automatically
    if (Object.keys(newAnalyzed).length === 3) {
      setTimeout(() => {
        setIsAdultPhase(true);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
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
                Identify the growth gaps on the baby's skull to see how they fuse as we get older!
              </Text>
            </View>
            <TouchableOpacity style={styles.startBtn} onPress={() => setShowBriefing(false)}>
              <Text style={styles.startBtnText}>START MISSION</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      )}

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SKULL GROWTH LAB</Text>
      </View>

      <ScrollView contentContainerStyle={styles.main}>
        
        {/* INSTRUCTION TEXT */}
        <View style={styles.instructionBox}>
           <Text style={styles.instructionMain}>
             {isAdultPhase ? "OBSERVE ADULT FUSION" : "SCAN INFANT GAPS"}
           </Text>
           <Text style={styles.instructionSub}>
             {isAdultPhase 
                ? "Notice how the red dots are gone? The bones have joined together!" 
                : "Tap the 3 red medical icons to analyze the skull gaps."}
           </Text>
        </View>

        {/* SCAN AREA */}
        <View style={[styles.scanArea, isAdultPhase && styles.scanAreaAdult]}>
          <Ionicons 
            name="skull" 
            size={280} 
            color={isAdultPhase ? "#334155" : "#1E293B"} 
            style={styles.skullBg} 
          />

          {sutures.map((s) => (
            <View key={s.id} style={[styles.marker, { top: s.top as any, left: s.left as any }]}>
              {!isAdultPhase ? (
                <TouchableOpacity onPress={() => handlePress(s.id)} style={styles.markerGroup}>
                   <Animated.View entering={ZoomIn} style={[styles.dot, analyzed[s.id] && styles.dotFound]}>
                     <Ionicons name={analyzed[s.id] ? "checkmark" : "medical"} size={12} color="white" />
                   </Animated.View>
                </TouchableOpacity>
              ) : (
                /* AUTOMATICALLY SHOWS FUSED LINES IN PHASE 2 */
                <Animated.View entering={FadeIn} style={styles.fusedContainer}>
                  <View style={styles.fusedLine} />
                </Animated.View>
              )}
            </View>
          ))}
        </View>

        {/* LOG EVIDENCE (Only appears after phase 2 starts) */}
        {isAdultPhase && (
          <Animated.View entering={ZoomIn} style={styles.finishCard}>
             <View style={styles.successIcon}>
                <Ionicons name="ribbon" size={30} color="white" />
             </View>
             <Text style={styles.finishTitle}>GROWTH MATCHED</Text>
             <Text style={styles.finishBody}>
               You discovered that infants have open sutures while adults have fused ones!
             </Text>
             <TouchableOpacity style={styles.logBtn} onPress={() => router.push('/evidences')}>
               <Text style={styles.logBtnText}>FINISH & LOG EVIDENCE</Text>
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

  briefingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(2, 6, 23, 0.95)', zIndex: 100, justifyContent: 'center', padding: 20 },
  briefingCard: { backgroundColor: 'white', borderRadius: 30, padding: 20, alignItems: 'center' },
  briefingTitle: { fontSize: 14, fontWeight: '900', color: '#64748B', letterSpacing: 2, marginBottom: 15 },
  imageContainer: { width: '100%', height: 200, backgroundColor: '#F1F5F9', borderRadius: 20, overflow: 'hidden', marginBottom: 15 },
  briefingImage: { width: '100%', height: '100%' },
  infoBox: { padding: 15, backgroundColor: '#F8FAFC', borderRadius: 15, marginBottom: 20 },
  infoText: { textAlign: 'center', color: '#475569', fontSize: 13 },
  startBtn: { backgroundColor: '#38BDF8', width: '100%', padding: 18, borderRadius: 15, alignItems: 'center' },
  startBtnText: { color: 'white', fontWeight: '900' },

  instructionBox: { width: '100%', marginBottom: 20, alignItems: 'center' },
  instructionMain: { color: '#38BDF8', fontWeight: '900', fontSize: 18, letterSpacing: 1 },
  instructionSub: { color: '#94A3B8', fontSize: 12, textAlign: 'center', marginTop: 5 },

  scanArea: { width: '100%', height: 400, backgroundColor: '#0F172A', borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1E293B' },
  scanAreaAdult: { borderColor: '#10B981', backgroundColor: '#020617' },
  skullBg: { opacity: 0.6 },
  
  marker: { position: 'absolute' },
  markerGroup: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FECACA' },
  dotFound: { backgroundColor: '#10B981', borderColor: '#A7F3D0' },
  
  fusedContainer: { alignItems: 'center', justifyContent: 'center' },
  fusedLine: { width: 35, height: 4, backgroundColor: '#334155', borderRadius: 2 },

  finishCard: { marginTop: 20, backgroundColor: '#10B981', padding: 20, borderRadius: 25, width: '100%', alignItems: 'center' },
  successIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  finishTitle: { color: 'white', fontWeight: '900', fontSize: 18 },
  finishBody: { color: 'white', fontSize: 12, textAlign: 'center', marginVertical: 10, opacity: 0.9 },
  logBtn: { backgroundColor: '#064E3B', width: '100%', padding: 15, borderRadius: 15, alignItems: 'center' },
  logBtnText: { color: 'white', fontWeight: '900' }
});