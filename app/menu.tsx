import React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { Search, ShieldCheck } from 'lucide-react-native';
import { Colors } from '../src/constants/Colors'; 
import { useRouter } from 'expo-router'; 
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
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, subtitle, icon: Icon, color, onPress }) => {
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
      <Animated.View style={[styles.card, { backgroundColor: color }, animatedStyle]}>
        <View style={styles.iconContainer}>
          <Icon size={48} color="white" strokeWidth={2.5} />
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default function MenuScreen() {
  const router = useRouter(); 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>🕵️‍♀️</Text>
        <Text style={styles.heading}>Welcome to Frenzy!</Text>
        <Text style={styles.subHeading}>Ready to solve some mysteries, Junior Detective?</Text>
      </View>

      <View style={styles.buttonContainer}>
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
    marginBottom: 40,
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
    flexDirection: 'column',
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
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A', 
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#0F172A',
    opacity: 0.8,
    marginTop: 5,
  },
  footerDecor: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    opacity: 0.5,
  }
});