import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../src/constants/Colors';
import { Send } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';

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
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
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
        <Send size={18} color="#0F172A" style={{ marginLeft: 8 }} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingTop: 60, paddingBottom: 120 },
  backButton: { marginBottom: 20 },
  headerTitle: { fontSize: 32, fontWeight: '900', color: Colors.text },
  headerSubtitle: { fontSize: 16, color: '#94A3B8', marginBottom: 30 },
  qContainer: { marginBottom: 30, backgroundColor: '#1E293B', padding: 20, borderRadius: 20 },
  moduleTag: { color: Colors.primary, fontWeight: 'bold', fontSize: 12, marginBottom: 8, textTransform: 'uppercase' },
  questionText: { color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 20 },
  optionsGrid: { gap: 10 },
  optionButton: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  selectedOption: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  optionText: { color: 'white', fontWeight: '600', textAlign: 'center' },
  selectedOptionText: { color: '#0F172A' },
  submitButton: { position: 'absolute', bottom: 30, right: 20, backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 25, borderRadius: 12, elevation: 10 },
  submitText: { color: '#0F172A', fontWeight: 'bold', fontSize: 16 },
});