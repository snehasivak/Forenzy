import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Bot, Send } from 'lucide-react-native';

export default function JuniorLabAI() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

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
      setResponse(data.choices[0].message.content);
    } catch (error) {
      setResponse("Oops! 😵 My lab tools are broken. Try again! 🧪");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="white" /></Pressable>
        <Text style={styles.headerTitle}>Junior Lab AI 🤖</Text>
      </View>

      <ScrollView style={styles.chatArea}>
        {loading && <ActivityIndicator size="large" color={Colors.primary} />}
        
        {response ? (
          <View style={styles.aiBubble}>
            <Text style={styles.responseText}>{response}</Text>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Ask me a science secret! 🔍</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputWrapper}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="How do I find DNA? 🧬"
            placeholderTextColor="#94A3B8"
            value={query}
            onChangeText={setQuery}
          />
          <Pressable style={styles.sendButton} onPress={askJuniorLab}>
            <Send size={20} color="#0F172A" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 60, padding: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold', marginLeft: 15 },
  chatArea: { flex: 1, padding: 20 },
  aiBubble: { 
    backgroundColor: '#1E293B', 
    padding: 20, 
    borderRadius: 20, 
    borderWidth: 2, 
    borderColor: Colors.primary, // Using primary color for border
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  },
  responseText: { 
    color: '#FFD700', // Gold color for the AI text to make it stand out
    fontSize: 18, 
    lineHeight: 28, 
    fontWeight: '600',
    textAlign: 'center'
  },
  placeholder: { marginTop: 100, alignItems: 'center' },
  placeholderText: { color: '#94A3B8', fontSize: 16, fontStyle: 'italic' },
  inputWrapper: { padding: 20 },
  searchContainer: { flexDirection: 'row', backgroundColor: '#1E293B', borderRadius: 20, padding: 10, alignItems: 'center' },
  input: { flex: 1, color: 'white', fontSize: 16, paddingHorizontal: 10 },
  sendButton: { backgroundColor: Colors.primary, padding: 12, borderRadius: 15 }
});