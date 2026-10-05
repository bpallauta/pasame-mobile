import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';

const MOCK_BALANCES = [
  { id: 1, name: 'Benjamín', balance: 45000 },
  { id: 2, name: 'Ana', balance: -20000 },
  { id: 3, name: 'Pedro', balance: -15000 },
  { id: 4, name: 'Juan', balance: -10000 },
];

export default function SimplifyDebtsScreen({ navigation }: any) {

  // Smart Debt Simplification Algorithm
  const simplifiedTransactions = useMemo(() => {
    const debtors = MOCK_BALANCES.filter(m => m.balance < 0).map(m => ({ ...m }));
    const creditors = MOCK_BALANCES.filter(m => m.balance > 0).map(m => ({ ...m }));
    
    // Sort by largest amounts to optimize
    debtors.sort((a, b) => a.balance - b.balance); // Most negative first
    creditors.sort((a, b) => b.balance - a.balance); // Most positive first

    const transactions = [];
    let i = 0; // debtors index
    let j = 0; // creditors index

    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      
      const debtAmount = Math.abs(debtor.balance);
      const creditAmount = creditor.balance;
      
      const settledAmount = Math.min(debtAmount, creditAmount);
      
      transactions.push({
        from: debtor.name,
        to: creditor.name,
        amount: settledAmount
      });
      
      debtor.balance += settledAmount;
      creditor.balance -= settledAmount;
      
      if (Math.abs(debtor.balance) < 0.01) i++;
      if (creditor.balance < 0.01) j++;
    }
    
    return transactions;
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 20}}>❮</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.heroSection}>
          <Text style={styles.iconGiant}>✨</Text>
          <Text style={styles.title}>Deudas Simplificadas</Text>
          <Text style={styles.subtitle}>
            Hemos calculado la forma más rápida de cuadrar la caja. Así evitamos transferencias innecesarias entre ustedes.
          </Text>
        </View>

        <View style={styles.transactionsContainer}>
          {simplifiedTransactions.map((tx, index) => (
            <View key={index} style={styles.transactionCard}>
              <View style={styles.peopleRow}>
                <View style={styles.personBubble}>
                  <Text style={styles.personText}>{tx.from}</Text>
                </View>
                <Text style={styles.arrowIcon}>➔</Text>
                <View style={styles.personBubble}>
                  <Text style={styles.personText}>{tx.to}</Text>
                </View>
              </View>
              <Text style={styles.amountText}>Paga ${Math.round(tx.amount).toLocaleString('es-CL')}</Text>
            </View>
          ))}
        </View>
        <View style={{height: 40}}/>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={globalStyles.buttonPrimary}>
          <Text style={{fontSize: 20, marginRight: 8}}>🔔</Text>
          <Text style={globalStyles.buttonPrimaryText}>Notificar a todos</Text>
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
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 10,
  },
  iconGiant: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  transactionsContainer: {
    paddingBottom: 24,
  },
  transactionCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  peopleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  personBubble: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  personText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  arrowIcon: {
    fontSize: 16,
    color: colors.textLight,
    marginHorizontal: 12,
  },
  amountText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: colors.background,
  },
});
