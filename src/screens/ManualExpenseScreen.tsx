import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function ManualExpenseScreen({ navigation }: any) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSave = () => {
    // In a real app we'd POST to /expenses and distribute automatically
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nuevo Gasto</Text>
      
      <View style={styles.formCard}>
        <Text style={styles.label}>¿Qué pagaste?</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej: Entradas para el cine" 
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>¿Cuánto pagaste?</Text>
        <TextInput 
          style={styles.inputAmount} 
          placeholder="$0" 
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>¿Quiénes participaron?</Text>
        <Text style={styles.hintText}>
          El sistema dividirá este monto en partes iguales entre los participantes que selecciones.
        </Text>
        
        {/* Placeholder for participant selector */}
        <TouchableOpacity style={styles.participantSelect}>
          <Text style={styles.participantSelectText}>Seleccionar personas o equipo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Gasto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 40,
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  inputAmount: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  hintText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  participantSelect: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 16,
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  participantSelectText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
