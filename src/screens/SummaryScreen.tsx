import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';

export default function SummaryScreen({ route, navigation }: any) {
  const { billData, participants, assignments } = route.params;
  
  const [tipPercentage, setTipPercentage] = useState(10);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);

  // Math engine
  const calculation = useMemo(() => {
    const personTotals: Record<number, number> = {};
    const personDetails: Record<number, any[]> = {};
    
    participants.forEach((p: any) => {
      personTotals[p.id] = 0;
      personDetails[p.id] = [];
    });

    let calculatedSubtotal = 0;

    billData?.items?.forEach((item: any, index: number) => {
      const assignees = assignments[index] || [];
      if (assignees.length > 0) {
        const splitPrice = item.price / assignees.length;
        calculatedSubtotal += item.price;
        
        assignees.forEach((id: number) => {
          personTotals[id] += splitPrice;
          personDetails[id].push({ name: item.name, amount: splitPrice });
        });
      }
    });

    const tipAmount = (calculatedSubtotal * tipPercentage) / 100;
    const grandTotal = calculatedSubtotal + tipAmount;

    const finalBalances = participants.map((p: any) => {
      const baseConsumption = personTotals[p.id];
      const consumptionRatio = calculatedSubtotal > 0 ? baseConsumption / calculatedSubtotal : 0;
      const proportionalTip = tipAmount * consumptionRatio;
      
      return {
        ...p,
        baseTotal: baseConsumption,
        tipTotal: proportionalTip,
        finalTotal: baseConsumption + proportionalTip,
        details: personDetails[p.id]
      };
    });

    return {
      subtotal: calculatedSubtotal,
      tipAmount,
      grandTotal,
      finalBalances
    };
  }, [billData, participants, assignments, tipPercentage]);

  const handleCharge = () => {
    navigation.navigate('SendCharge', { billData, calculation });
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 20}}>❮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.tipSection}>
          <Text style={styles.sectionTitle}>¿Agregamos propina?</Text>
          <View style={styles.tipButtonsRow}>
            {[10, 15, 20].map(val => (
              <TouchableOpacity 
                key={val} 
                style={[styles.tipButton, tipPercentage === val && styles.tipButtonSelected]}
                onPress={() => setTipPercentage(val)}
              >
                <Text style={[styles.tipButtonText, tipPercentage === val && styles.tipButtonTextSelected]}>
                  {val}%
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              style={[styles.tipButton, tipPercentage === 0 && styles.tipButtonSelected]}
              onPress={() => setTipPercentage(0)}
            >
              <Text style={[styles.tipButtonText, tipPercentage === 0 && styles.tipButtonTextSelected]}>
                Sin propina
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.headerEmoji}>🎉</Text>
          <Text style={styles.headerTitle}>Ya está cuadrada la cuenta</Text>
          <Text style={styles.restaurantName}>{billData?.restaurant || 'Restaurante XYZ'}</Text>
          
          <Text style={styles.grandTotalLabel}>Total con propina:</Text>
          <Text style={styles.grandTotalValue}>${Math.round(calculation.grandTotal).toLocaleString('es-CL')}</Text>
        </View>

        <Text style={[styles.sectionTitle, {marginTop: 20}]}>Personas ({participants.length})</Text>
        
        {calculation.finalBalances.map((person: any) => (
          <TouchableOpacity 
            key={person.id} 
            style={styles.personCard}
            onPress={() => setSelectedPerson(person)}
          >
            <View style={styles.avatarRow}>
              <View style={styles.avatar}>
                <Text style={{fontSize: 16}}>👤</Text>
              </View>
              <Text style={styles.personName}>{person.name}</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.personAmount}>
                ${Math.round(person.finalTotal).toLocaleString('es-CL')}
              </Text>
              <Text style={{color: colors.textLight, fontSize: 12}}>Ver detalle</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{height: 40}} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleCharge}>
          <Text style={globalStyles.buttonPrimaryText}>Pásame la plata</Text>
        </TouchableOpacity>
      </View>

      {/* Detail Modal */}
      <Modal visible={!!selectedPerson} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedPerson?.name} debe pagar:</Text>
            <Text style={styles.modalTotal}>${Math.round(selectedPerson?.finalTotal || 0).toLocaleString('es-CL')}</Text>
            
            <View style={styles.modalDivider} />
            <Text style={styles.modalSubtitle}>Detalle:</Text>
            
            <ScrollView style={styles.detailsList}>
              {selectedPerson?.details.map((d: any, idx: number) => (
                <View key={idx} style={styles.detailRow}>
                  <Text style={styles.detailName}>{d.name}</Text>
                  <Text style={styles.detailAmount}>${Math.round(d.amount).toLocaleString('es-CL')}</Text>
                </View>
              ))}
              <View style={styles.detailRow}>
                <Text style={styles.detailName}>💰 Propina ({tipPercentage}%)</Text>
                <Text style={styles.detailAmount}>${Math.round(selectedPerson?.tipTotal || 0).toLocaleString('es-CL')}</Text>
              </View>
            </ScrollView>

            <TouchableOpacity style={[globalStyles.buttonSecondary, {marginTop: 20}]} onPress={() => setSelectedPerson(null)}>
              <Text style={globalStyles.buttonSecondaryText}>Cerrar detalle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  tipSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  tipButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tipButton: {
    backgroundColor: colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tipButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tipButtonText: {
    color: colors.textSecondary,
    fontWeight: '700',
    fontSize: 15,
  },
  tipButtonTextSelected: {
    color: colors.surface,
  },
  
  summaryCard: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  headerTitle: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  restaurantName: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginBottom: 32,
    fontWeight: '500',
  },
  grandTotalLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '600',
  },
  grandTotalValue: {
    color: colors.surface,
    fontSize: 40,
    fontWeight: '800',
  },

  personCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  personName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  personAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  
  footer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: colors.background,
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 30,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalTotal: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  modalDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 24,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  detailsList: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailName: {
    fontSize: 16,
    color: colors.text,
  },
  detailAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
});
