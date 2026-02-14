import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Dimensions, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { BookOpen, Fingerprint, Construction, CheckCircle, XCircle } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Academy Palette
const ACADEMY_COLORS = {
  background: '#F0F9FF', 
  text: '#2D3436',       
  mint: '#4ECDC4',    
  yellow: '#FFD166',  
  purple: '#A29BFE',   
  white: '#FFFFFF',
  softGrey: '#94A3B8'
};

// Reusable Popup Flashcard Component
const FlippableFlashcard = ({ question, children, color, icon: Icon, fullWidth = false }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ width: fullWidth ? '100%' : '48%', marginTop: fullWidth ? 15 : 0 }}>
      {/* The Actual Card Trigger */}
      <Pressable 
        style={[styles.cardBase, { backgroundColor: color, position: 'relative', height: 160 }]} 
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.iconCircle}>
          <Icon size={32} color="white" />
        </View>
        <Text style={styles.cardText}>{question}</Text>
        <Text style={styles.tapHint}>Tap to reveal secret! </Text>
      </Pressable>

      {/* Full Screen Popup Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { borderTopColor: color, borderTopWidth: 10 }]}>
            <Pressable style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <XCircle size={32} color={ACADEMY_COLORS.softGrey} />
            </Pressable>

            <View style={[styles.iconCircleBig, { backgroundColor: color }]}>
              <Icon size={50} color="white" />
            </View>

            <Text style={styles.modalTitle}>{question}</Text>
            
            <View style={styles.answerBox}>
              {children}
            </View>

            <Pressable style={[styles.gotItBtn, { backgroundColor: color }]} onPress={() => setModalVisible(false)}>
              <Text style={styles.gotItText}>GOT IT, DETECTIVE! 🔍</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ... ExploreCard stays the same ...
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
    <View style={{ flex: 1, backgroundColor: ACADEMY_COLORS.background }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={ACADEMY_COLORS.text} />
        </Pressable>

        <Text style={styles.headerTitle}>Learning Lab</Text>
        <Text style={styles.headerSubtitle}>Tap a card to start your training! 🔍</Text>

        <View style={styles.grid}>
          <FlippableFlashcard 
            question="What is Forensics?" 
            icon={BookOpen}
            color={ACADEMY_COLORS.purple}
          >
            <Text style={styles.answerEmoji}>🕵️‍♂️</Text>
            <Text style={styles.answerTextBig}>Using science to find hidden clues and tell the true story of what happened!</Text>
          </FlippableFlashcard>

          <ExploreCard 
            title="Evidences" 
            icon={Fingerprint} 
            color={ACADEMY_COLORS.mint} 
            onPress={() => router.push('/evidences')} 
          />
          
          <FlippableFlashcard 
            question="Crime Scene Do's and Don'ts" 
            icon={Construction}
            color={ACADEMY_COLORS.yellow}
            fullWidth={true}
          >
            <View style={styles.dosDontsContainer}>
              <View style={styles.column}>
                <Text style={styles.columnTitle}>✅ DO</Text>
                <Text style={styles.columnItem}>🧤 Wear gloves</Text>
                <Text style={styles.columnItem}>📸 Take photos</Text>
                <Text style={styles.columnItem}>🧐 Look closely</Text>
              </View>
              <View style={styles.divider} />
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
  headerTitle: { fontSize: 32, fontWeight: '900', color: ACADEMY_COLORS.text },
  headerSubtitle: { fontSize: 16, color: ACADEMY_COLORS.softGrey, marginBottom: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { padding: 20, borderRadius: 25, alignItems: 'center', justifyContent: 'center', minHeight: 160, elevation: 5 },
  cardBase: { padding: 15, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  iconCircle: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: 15, marginBottom: 8 },
  cardText: { color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
  tapHint: { fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 5, fontWeight: 'bold' },
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30, alignItems: 'center', minHeight: height * 0.7 },
  closeBtn: { alignSelf: 'flex-end', marginBottom: 10 },
  iconCircleBig: { padding: 25, borderRadius: 40, marginBottom: 20 },
  modalTitle: { fontSize: 26, fontWeight: '900', color: ACADEMY_COLORS.text, textAlign: 'center', marginBottom: 20 },
  answerBox: { width: '100%', alignItems: 'center', marginBottom: 30 },
  answerEmoji: { fontSize: 60, marginBottom: 15 },
  answerTextBig: { fontSize: 20, color: ACADEMY_COLORS.text, textAlign: 'center', lineHeight: 30, fontWeight: '600' },
  gotItBtn: { paddingVertical: 18, paddingHorizontal: 40, borderRadius: 20, width: '100%', alignItems: 'center' },
  gotItText: { color: 'white', fontWeight: '900', fontSize: 16 },

  dosDontsContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-around', paddingVertical: 10 },
  column: { alignItems: 'flex-start', flex: 1, paddingHorizontal: 10 },
  columnTitle: { color: ACADEMY_COLORS.text, fontWeight: '900', fontSize: 22, marginBottom: 15 },
  columnItem: { color: '#4A5568', fontSize: 18, fontWeight: '600', marginBottom: 12 },
  divider: { width: 2, height: '90%', backgroundColor: '#E2E8F0' },

  doneButton: { position: 'absolute', bottom: 30, right: 20, backgroundColor: ACADEMY_COLORS.mint, flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 50 },
  doneText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
});