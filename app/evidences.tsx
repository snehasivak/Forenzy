import React from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/constants/Colors';
import { CheckCircle } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EVIDENCE_DATA = [
  { id: 'glass', title: 'Glass', image: require('../assets/images/glass.jpg') },
  { id: 'blood', title: 'Bloodstains', image: require('../assets/images/bloodstain.png') },
  { id: 'bones', title: 'Bones', image: require('../assets/images/bones.gif') },
  { id: 'fingerprint', title: 'Fingerprint', image: require('../assets/images/fingerprint.jpg') },
  { id: 'hair', title: 'Hair', image: require('../assets/images/hair.jpg') },
  { id: 'soil', title: 'Soil', image: require('../assets/images/soil.jpg') },
];

export default function EvidencesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      
      {/* HEADER: Centered */}
<View style={styles.header}>
  <Pressable onPress={() => router.back()} style={styles.backButton}>
    <Ionicons name="arrow-back" size={24} color={Colors.text} />
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
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center', // Centers the text and back button horizontally
    justifyContent: 'center',
  },
  backButton: { 
    position: 'absolute', // Pulls button to the left so it doesn't push text off-center
    left: 0,
    top: 5,
  },
  headerTitle: { 
    fontSize: 26, 
    fontWeight: '900', 
    color: Colors.text, 
    letterSpacing: 1,
    textAlign: 'center', // Ensures text centers within its own box
  },
  headerSubtitle: { 
    fontSize: 13, 
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 2,
  },
  
  gridWrapper: {
    flex: 1,
    alignItems: 'center', // Centers the grid on desktop
    justifyContent: 'center',
  },
  gridContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 500, 
    marginVertical: 10,
    gap: 20, // Increased vertical space between rows
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 20, // Increased horizontal space between the two columns
  },
  card: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.15)',
    // We can remove aspectRatio if you want the cards to 
    // stretch slightly to fill the space, or keep it for consistency.
    aspectRatio: 0.85, 
  },
  cardPreview: {
    flex: 1, 
    width: '100%',
    height: '100%',
    // This is the safety net - ensures the whole image fits without stretching
    backgroundColor: '#070C14', 
  },
  cardFooter: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  cardTitle: {
    color: 'white',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footer: {
    paddingVertical: 15,
    alignItems: 'flex-end',
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  doneText: { color: 'white', fontWeight: 'bold' },
});