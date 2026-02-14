import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, ActivityIndicator, Alert, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Bot, Send } from 'lucide-react-native';

// Academy Palette - Consistent with your new theme
const ACADEMY_COLORS = {
  background: '#F0F9FF', 
  text: '#2D3436',       
  mint: '#4ECDC4',    
  purple: '#A29BFE',   
  white: '#FFFFFF',
  softGrey: '#94A3B8'
};

export default function JuniorLabAI() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Using the protected environment variable
  const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

  const askJuniorLab = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { 
              role: "system", 
              content: `You are a fun Junior Lab Assistant. 
              1. Keep replies VERY short (max 3 sentences). 
              2. Use LOTS of emojis (🧪, 🔍, 🧬, ✨).
              3. Use proper spacing between sentences.
              4. Always start with a friendly greeting like "Hey Detective!"
              5. Use kid-friendly language for school students.` 
            },
            { role: "user", content: query }
          ],
        }),
      });

      const data = await res.json();
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content);
      }
    } catch (error) {
      setResponse("Oops! 😵 My lab tools are a bit glitchy. Try again! 🧪");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header matching Academy Style */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={ACADEMY_COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Junior Lab AI</Text>
        <Bot color={ACADEMY_COLORS.mint} size={28} />
      </View>

      <ScrollView style={styles.chatArea} contentContainerStyle={styles.scrollContent}>
        {loading && <ActivityIndicator size="large" color={ACADEMY_COLORS.mint} style={{ marginTop: 50 }} />}
        
        {response ? (
          <View style={styles.aiBubble}>
            <Text style={styles.responseText}>{response}</Text>
          </View>
        ) : !loading && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderEmoji}>🤖</Text>
            <Text style={styles.placeholderText}>Ask me a science secret! 🔍</Text>
          </View>
        )}
      </ScrollView>

      {/* Search Input Area */}
      <View style={styles.inputWrapper}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="How do I find DNA? 🧬"
            placeholderTextColor={ACADEMY_COLORS.softGrey}
            value={query}
            onChangeText={setQuery}
          />
          <Pressable 
            style={[styles.sendButton, !query.trim() && { opacity: 0.5 }]} 
            onPress={askJuniorLab}
            disabled={loading || !query.trim()}
          >
            <Send size={20} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ACADEMY_COLORS.background },
  header: { 
    paddingTop: 60, 
    paddingHorizontal: 20, 
    paddingBottom: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: ACADEMY_COLORS.white,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  backBtn: { marginRight: 15 },
  headerTitle: { color: ACADEMY_COLORS.text, fontSize: 22, fontWeight: 'bold', flex: 1 },
  chatArea: { flex: 1 },
  scrollContent: { padding: 25 },
  aiBubble: { 
    backgroundColor: ACADEMY_COLORS.white, 
    padding: 20, 
    borderRadius: 25, 
    borderTopLeftRadius: 5,
    borderWidth: 2, 
    borderColor: ACADEMY_COLORS.mint, 
    shadowColor: ACADEMY_COLORS.mint,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3
  },
  responseText: { 
    color: ACADEMY_COLORS.text, 
    fontSize: 18, 
    lineHeight: 28, 
    fontWeight: '600',
    textAlign: 'center'
  },
  placeholder: { marginTop: 100, alignItems: 'center' },
  placeholderEmoji: { fontSize: 60, marginBottom: 15 },
  placeholderText: { color: ACADEMY_COLORS.softGrey, fontSize: 16, fontStyle: 'italic' },
  inputWrapper: { padding: 20, paddingBottom: 35 },
  searchContainer: { 
    flexDirection: 'row', 
    backgroundColor: ACADEMY_COLORS.white, 
    borderRadius: 25, 
    padding: 10, 
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  input: { flex: 1, color: ACADEMY_COLORS.text, fontSize: 16, paddingHorizontal: 15 },
  sendButton: { 
    backgroundColor: ACADEMY_COLORS.mint, 
    padding: 12, 
    borderRadius: 20,
    marginLeft: 10
  }
});