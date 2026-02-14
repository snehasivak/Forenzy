import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Send } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';

// Academy Palette - Consistent with your new theme
const ACADEMY_COLORS = {
  background: '#F0F9FF', 
  text: '#2D3436',       
  mint: '#4ECDC4',    
  white: '#FFFFFF',
  softGrey: '#94A3B8'
};

export default function TestModeScreen() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions = [
    {
      id: 1,
      module: "What is Forensics?",
      q: "Forensics is best described as using ______ to solve mysteries.",
      options: ["Science 🧪", "Magic ✨"],
      correct: 0
    },
    {
      id: 2,
      module: "Evidences",
      q: "Which of these is a unique pattern found on fingertips?",
      options: ["Hair 💇", "Fingerprints ✋"],
      correct: 1
    },
    {
      id: 3,
      module: "Do's and Don'ts",
      q: "What is the first thing a detective should do at a scene?",
      options: ["Eat a snack 🍔", "Wear gloves 🧤"],
      correct: 1
    }
  ];

  const handleSelect = (qIdx: number, oIdx: number) => {
    setAnswers({ ...answers, [qIdx]: oIdx });
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) score++;
    });
    
    router.push({
      pathname: '/results',
      params: { score: Math.round((score / questions.length) * 100) }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: ACADEMY_COLORS.background }}>
      {/* Ensures status bar icons are visible on light background */}
      <StatusBar barStyle="dark-content" />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={ACADEMY_COLORS.text} />
        </Pressable>

        <Text style={styles.headerTitle}>Final Exam</Text>
        <Text style={styles.headerSubtitle}>Show us what you've learned, Detective!</Text>

        {questions.map((q, qIdx) => (
          <View key={q.id} style={styles.qContainer}>
            <Text style={styles.moduleTag}>{q.module}</Text>
            <Text style={styles.questionText}>{q.q}</Text>
            <View style={styles.optionsGrid}>
              {q.options.map((opt, oIdx) => (
                <Pressable 
                  key={oIdx}
                  style={[
                    styles.optionButton, 
                    answers[qIdx] === oIdx && styles.selectedOption
                  ]}
                  onPress={() => handleSelect(qIdx, oIdx)}
                >
                  <Text style={[
                    styles.optionText,
                    answers[qIdx] === oIdx && styles.selectedOptionText
                  ]}>{opt}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <Pressable 
        style={[styles.submitButton, Object.keys(answers).length < 3 && { opacity: 0.5 }]} 
        onPress={handleSubmit}
        disabled={Object.keys(answers).length < 3}
      >
        <Text style={styles.submitText}>Submit Test</Text>
        <Send size={18} color="white" style={{ marginLeft: 8 }} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingTop: 60, paddingBottom: 120 },
  backButton: { marginBottom: 20 },
  headerTitle: { fontSize: 32, fontWeight: '900', color: ACADEMY_COLORS.text },
  headerSubtitle: { fontSize: 16, color: ACADEMY_COLORS.softGrey, marginBottom: 30 },
  qContainer: { 
    marginBottom: 30, 
    backgroundColor: ACADEMY_COLORS.white, 
    padding: 20, 
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  moduleTag: { color: ACADEMY_COLORS.mint, fontWeight: 'bold', fontSize: 12, marginBottom: 8, textTransform: 'uppercase' },
  questionText: { color: ACADEMY_COLORS.text, fontSize: 18, fontWeight: '700', marginBottom: 20 },
  optionsGrid: { gap: 10 },
  optionButton: { 
    backgroundColor: '#F8FAFC', 
    padding: 15, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E2E8F0' 
  },
  selectedOption: { backgroundColor: ACADEMY_COLORS.mint, borderColor: ACADEMY_COLORS.mint },
  optionText: { color: ACADEMY_COLORS.text, fontWeight: '600', textAlign: 'center' },
  selectedOptionText: { color: 'white' },
  submitButton: { 
    position: 'absolute', 
    bottom: 30, 
    right: 20, 
    backgroundColor: ACADEMY_COLORS.mint, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 14, 
    paddingHorizontal: 25, 
    borderRadius: 15, 
    elevation: 10,
    shadowColor: ACADEMY_COLORS.mint,
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  submitText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});