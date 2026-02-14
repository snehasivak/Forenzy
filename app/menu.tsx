import React from 'react';
import { StyleSheet, Text, View, Pressable, StatusBar } from 'react-native';
import { Search, ShieldCheck, Bot, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router'; 
import { useUser } from '../UserContext'; 
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

// Kid-Friendly Palette matching Index Page
const UI_COLORS = {
  background: '#F0F9FF', 
  primary: '#4ECDC4',    
  secondary: '#FFD166',  
  aiPurple: '#A29BFE',   
  testBlue: '#74B9FF',   
  text: '#2D3436',       
  card: '#FFFFFF',       
};

interface MenuButtonProps {
  title: string;
  subtitle: string;
  icon: any; 
  color: string;
  onPress: () => void;
  isSmall?: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, subtitle, icon: Icon, color, onPress, isSmall }) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.96))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
    >
      <Animated.View style={[
        styles.card, 
        { backgroundColor: UI_COLORS.card, borderLeftColor: color, borderLeftWidth: 8 }, 
        isSmall && { marginBottom: 15 },
        animatedStyle
      ]}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Icon size={isSmall ? 28 : 40} color="white" strokeWidth={2.5} />
        </View>
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
        {isSmall && <Sparkles size={20} color={UI_COLORS.aiPurple} opacity={0.6} />}
      </Animated.View>
    </Pressable>
  );
};

export default function MenuScreen() {
  const router = useRouter(); 
  const { userName } = useUser(); 

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.emoji}>🌟</Text>
        <Text style={styles.heading}>Hi, {userName || 'Detective'}!</Text>
        <Text style={styles.subHeading}>Pick your mission for today!</Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* Junior Lab AI - Search Style */}
        <MenuButton 
          title="Junior Lab AI" 
          subtitle="Ask any forensic questions! "
          icon={Bot}
          color={UI_COLORS.aiPurple}
          isSmall={true}
          onPress={() => router.push('/junior_lab_ai')}
        />

        <View style={{ height: 10 }} />

        {/* Main Explore Mode */}
        <MenuButton 
          title="Explore" 
          subtitle="Learn the secrets of clues! "
          icon={Search}
          color={UI_COLORS.primary} 
          onPress={() => router.push('/explore')}
        />
        
        <View style={{ height: 20 }} />
        
        {/* Test Mode */}
        <MenuButton 
          title="Test Mode" 
          subtitle="Ready for the big challenge? "
          icon={ShieldCheck}
          color={UI_COLORS.testBlue} 
          onPress={() => router.push('/testmode')}
        />
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF', 
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  heading: {
    fontSize: 34,
    fontWeight: '900',
    color: '#2D3436', 
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: '#636E72', 
    textAlign: 'center',
    marginTop: 5,
  },
  buttonContainer: {
    width: '100%',
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    // Soft kid-friendly shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 18,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3436', 
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 2,
  },
  footerDecor: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    opacity: 0.4,
  }
});