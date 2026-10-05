import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';

const mockContacts = [
  { id: 1, name: 'Benjamín' },
  { id: 2, name: 'Ana' },
  { id: 3, name: 'Pedro' },
  { id: 4, name: 'Juan' },
];

export default function ParticipantsScreen({ route, navigation }: any) {
  const { billData } = route.params;
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([1]); // Default to self

  const toggleParticipant = (id: number) => {
    setSelectedParticipants(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    const participants = mockContacts.filter(c => selectedParticipants.includes(c.id));
    navigation.navigate('AssignItems', { billData, participants });
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 20}}>❮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>¿Quiénes estuvieron?</Text>
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Mis personas</Text>
          
          {mockContacts.map(contact => {
            const isSelected = selectedParticipants.includes(contact.id);
            return (
              <TouchableOpacity 
                key={contact.id} 
                style={[styles.contactRow, isSelected && styles.contactRowSelected]}
                onPress={() => toggleParticipant(contact.id)}
              >
                <View style={styles.avatarRow}>
                  <View style={styles.avatar}>
                    <Text style={{fontSize: 16}}>👤</Text>
                  </View>
                  <Text style={[styles.contactName, isSelected && styles.contactNameSelected]}>
                    {contact.name}
                  </Text>
                </View>
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
          
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Agregar persona</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[globalStyles.buttonPrimary, selectedParticipants.length === 0 && styles.buttonDisabled]} 
          onPress={handleContinue}
          disabled={selectedParticipants.length === 0}
        >
          <Text style={globalStyles.buttonPrimaryText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 10,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactRowSelected: {
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 0,
    marginVertical: 4,
    marginHorizontal: -12,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactName: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  contactNameSelected: {
    fontWeight: '700',
    color: colors.primaryGradientEnd,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '900',
  },
  addButton: {
    marginTop: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: colors.background,
  },
  buttonDisabled: {
    backgroundColor: colors.textLight,
  }
});
