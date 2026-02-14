import React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { Search, ShieldCheck, Bot, Sparkles } from 'lucide-react-native'; // Added Bot and Sparkles
import { Colors } from '../src/constants/Colors'; 
import { useRouter } from 'expo-router'; 
import { useUser } from '../UserContext'; // Added to track name
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

interface MenuButtonProps {
  title: string;
  subtitle: string;
  icon: any; 
  color: string;
  onPress: () => void;
  isSmall?: boolean; // Added for different button sizes
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, subtitle, icon: Icon, color, onPress, isSmall }) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
    >
      <Animated.View style={[
        styles.card, 
        { backgroundColor: color }, 
        isSmall && { padding: 15, borderRadius: 20 },
        animatedStyle
      ]}>
        <View style={[styles.iconContainer, isSmall && { marginBottom: 0, marginRight: 15 }]}>
          <Icon size={isSmall ? 24 : 48} color="white" strokeWidth={2.5} />
        </View>
        <View style={isSmall && { flex: 1 }}>
          <Text style={[styles.cardTitle, isSmall && { fontSize: 18 }]}>{title}</Text>
          <Text style={[styles.cardSubtitle, isSmall && { fontSize: 12, marginTop: 2 }]}>{subtitle}</Text>
        </View>
        {isSmall && <Sparkles size={20} color="white" opacity={0.7} />}
      </Animated.View>
    </Pressable>
  );
};

export default function MenuScreen() {
  const router = useRouter(); 
  const { userName } = useUser(); // Pulling the name from your Context

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>🕵️‍♀️</Text>
        <Text style={styles.heading}>Hi, {userName || 'Detective'}!</Text>
        <Text style={styles.subHeading}>Ready to solve some mysteries?</Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* NEW JUNIOR LAB AI BUTTON (Search Style) */}
        <MenuButton 
          title="Junior Lab AI" 
          subtitle="Ask me any Forensic doubts!"
          icon={Bot}
          color="#8B5CF6" // Purple for AI
          isSmall={true}
          onPress={() => router.push('/junior_lab_ai')}
        />

        <View style={{ height: 20 }} />

        <MenuButton 
          title="Explore" 
          subtitle="Learn the secrets of Forensics!"
          icon={Search}
          color={Colors.primary} 
          onPress={() => router.push('/explore')}
        />
        
        <View style={{ height: 20 }} />
        
        <MenuButton 
          title="Test Mode" 
          subtitle="Are you a Master Sleuth?"
          icon={ShieldCheck}
          color="#6C9BCF" 
          onPress={() => router.push('/testmode')}
        />
      </View>
      
      <View style={styles.footerDecor}>
         <Text style={{fontSize: 40}}>🔍  🩸  🧬</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, 
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  heading: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.text, 
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: '#94A3B8', 
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  card: {
    width: '100%',
    padding: 25,
    borderRadius: 30,
    flexDirection: 'row', // Changed to row for search-style buttons
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 20,
    marginBottom: 0, // Removed bottom margin for row layout
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF', // Changed to white for better contrast on purple/blue
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 5,
  },
  footerDecor: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    opacity: 0.5,
  }
});