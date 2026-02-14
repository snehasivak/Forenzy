import React from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Academy Palette - Matching your Index/Menu theme
const ACADEMY_COLORS = {
  background: '#F0F9FF', 
  text: '#2D3436',       
  mint: '#4ECDC4',    
  card: '#FFFFFF',
  softGrey: '#94A3B8'
};

const EVIDENCE_DATA = [
  { id: 'glass', title: 'Glass', image: require('../assets/images/glass.jpg') },
  { id: 'blood', title: 'Bloodstains', image: require('../assets/images/bloodstain.png') },
  { id: 'bones', title: 'Bones', image: require('../assets/images/bones.gif') },
  { id: 'fingerprint', title: 'Fingerprint', image: require('../assets/images/fingerprint.jpg') },
];

export default function EvidencesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      
      {/* HEADER: Centered */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={ACADEMY_COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Evidence Lab</Text>
        <Text style={styles.headerSubtitle}>Analyze the clues below</Text>
      </View>

      {/* Centered Grid with a max width for Desktop */}
      <View style={styles.gridWrapper}>
        <View style={styles.gridContainer}>
          {[0, 2, 4].map((startIndex) => (
            <View key={startIndex} style={styles.row}>
              {EVIDENCE_DATA.slice(startIndex, startIndex + 2).map((item) => (
                <Pressable 
                  key={item.id} 
                  style={styles.card} 
                  onPress={() => router.push(`/${item.id}`)}
                >
                  <ImageBackground 
                    source={item.image} 
                    style={styles.cardPreview} 
                    resizeMode="contain" 
                    imageStyle={{ opacity: 0.9 }}
                  />
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable 
          style={styles.doneButton} 
          onPress={() => router.push('/explore')}
        >
          <Text style={styles.doneText}>All done</Text>
          <CheckCircle size={18} color="white" style={{ marginLeft: 6 }} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    backgroundColor: ACADEMY_COLORS.background,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: { 
    position: 'absolute',
    left: 0,
    top: 5,
  },
  headerTitle: { 
    fontSize: 26, 
    fontWeight: '900', 
    color: ACADEMY_COLORS.text, 
    letterSpacing: 1,
    textAlign: 'center',
  },
  headerSubtitle: { 
    fontSize: 13, 
    color: ACADEMY_COLORS.softGrey,
    textAlign: 'center',
    marginTop: 2,
  },
  gridWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 500, 
    marginVertical: 10,
    gap: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
  },
  card: {
    flex: 1,
    backgroundColor: ACADEMY_COLORS.card,
    borderRadius: 20, // Slightly more rounded for a kid-friendly feel
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.2)',
    aspectRatio: 0.85, 
    elevation: 4, // Added shadow for a "popping" look
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardPreview: {
    flex: 1, 
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF', // Changed from black to white to fit the theme
  },
  cardFooter: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: ACADEMY_COLORS.card,
    borderTopWidth: 1,
    borderTopColor: '#F0F4F8',
  },
  cardTitle: {
    color: ACADEMY_COLORS.text,
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footer: {
    paddingVertical: 15,
    alignItems: 'flex-end',
  },
  doneButton: {
    backgroundColor: ACADEMY_COLORS.mint, // Consistent with your main theme
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  doneText: { color: 'white', fontWeight: 'bold' },
});