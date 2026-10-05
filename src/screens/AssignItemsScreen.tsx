import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';

export default function AssignItemsScreen({ route, navigation }: any) {
  const { billData, participants } = route.params;
  
  // State: item index -> array of participant ids
  const [assignments, setAssignments] = useState<Record<number, number[]>>({});

  const toggleAssignment = (itemIndex: number, participantId: number) => {
    setAssignments(prev => {
      const current = prev[itemIndex] || [];
      const updated = current.includes(participantId)
        ? current.filter(id => id !== participantId)
        : [...current, participantId];
      return { ...prev, [itemIndex]: updated };
    });
  };

  const handleContinue = () => {
    // Navigate to Tip/Summary phase (Phase 4)
    // Pass the assignments to calculate the total per person later
    navigation.navigate('Summary', { billData, participants, assignments });
  };

  const allAssigned = billData?.items?.every((_: any, index: number) => (assignments[index]?.length || 0) > 0);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 20}}>❮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>¿Quién consumió qué?</Text>
        
        {billData?.items?.map((item: any, index: number) => (
          <View key={index} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toLocaleString('es-CL')}</Text>
            </View>
            
            <View style={styles.participantsGrid}>
              {participants.map((p: any) => {
                const isSelected = (assignments[index] || []).includes(p.id);
                return (
                  <TouchableOpacity 
                    key={p.id} 
                    style={[styles.participantBadge, isSelected && styles.participantBadgeSelected]}
                    onPress={() => toggleAssignment(index, p.id)}
                  >
                    <Text style={[styles.participantName, isSelected && styles.participantNameSelected]}>
                      {p.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
        <View style={{height: 40}} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[globalStyles.buttonPrimary, !allAssigned && styles.buttonDisabled]} 
          onPress={handleContinue}
          disabled={!allAssigned}
        >
          <Text style={globalStyles.buttonPrimaryText}>
            {allAssigned ? 'Ir al Resumen' : 'Asigna todos los productos'}
          </Text>
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
  itemCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  participantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  participantBadge: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  participantBadgeSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
  },
  participantName: {
    color: colors.textSecondary,
    fontWeight: '500',
    fontSize: 14,
  },
  participantNameSelected: {
    color: colors.primaryGradientEnd,
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
