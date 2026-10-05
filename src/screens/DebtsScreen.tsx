import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const MOCK_DEBTS = [
  {
    id: 1,
    person: 'Ana',
    amount: 20000,
    type: 'owe_me', // Ana owes me
    origin: 'Restaurante XYZ',
    date: '04/10/2026',
    icon: '🍽️'
  },
  {
    id: 2,
    person: 'Pedro',
    amount: 10000,
    type: 'i_owe', // I owe Pedro
    origin: 'Pizzería',
    date: '02/10/2026',
    icon: '🍕'
  },
  {
    id: 3,
    person: 'Juan',
    amount: 25000,
    type: 'owe_me', // Juan owes me
    origin: 'Entradas Concierto',
    date: '01/10/2026',
    icon: '🎟️'
  }
];

export default function DebtsScreen({ navigation }: any) {
  const oweMeTotal = MOCK_DEBTS.filter(d => d.type === 'owe_me').reduce((acc, d) => acc + d.amount, 0);
  const iOweTotal = MOCK_DEBTS.filter(d => d.type === 'i_owe').reduce((acc, d) => acc + d.amount, 0);
  const netBalance = oweMeTotal - iOweTotal;
  const isNetPositive = netBalance >= 0;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Tus deudas</Text>

        {/* Global Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>🟢 Te deben</Text>
              <Text style={styles.oweMeAmount}>${oweMeTotal.toLocaleString('es-CL')}</Text>
            </View>
            <View style={styles.dividerVertical} />
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>🔴 Tú debes</Text>
              <Text style={styles.iOweAmount}>${iOweTotal.toLocaleString('es-CL')}</Text>
            </View>
          </View>
          
          <View style={styles.dividerHorizontal} />
          
          <View style={styles.netBalanceContainer}>
            <Text style={styles.netBalanceLabel}>Balance neto</Text>
            <Text style={[styles.netBalanceAmount, { color: isNetPositive ? '#22c55e' : '#ef4444' }]}>
              {isNetPositive ? '+' : '-'}${Math.abs(netBalance).toLocaleString('es-CL')}
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.newExpenseButton} onPress={() => navigation.navigate('ManualExpense')}>
          <Text style={styles.newExpenseIcon}>➕</Text>
          <Text style={styles.newExpenseText}>Nuevo gasto manual</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Detalle de deudas</Text>

        {MOCK_DEBTS.map(debt => (
          <View key={debt.id} style={styles.debtCard}>
            <View style={styles.debtHeader}>
              <Text style={styles.debtPerson}>{debt.person}</Text>
              <View>
                <Text style={styles.debtStatusLabel}>
                  {debt.type === 'owe_me' ? 'Te debe:' : 'Tú le debes:'}
                </Text>
                <Text style={[styles.debtAmount, { color: debt.type === 'owe_me' ? '#22c55e' : '#ef4444' }]}>
                  ${debt.amount.toLocaleString('es-CL')}
                </Text>
              </View>
            </View>
            <View style={styles.debtOrigin}>
              <Text style={styles.debtOriginText}>{debt.icon} {debt.origin}</Text>
              <Text style={styles.debtDate}>{debt.date}</Text>
            </View>
          </View>
        ))}

      </ScrollView>
    </View>
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
  balanceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceItem: {
    flex: 1,
  },
  dividerVertical: {
    width: 1,
    height: '80%',
    backgroundColor: '#e2e8f0',
    marginHorizontal: 16,
  },
  dividerHorizontal: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 4,
  },
  oweMeAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  iOweAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  netBalanceContainer: {
    alignItems: 'center',
  },
  netBalanceLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  netBalanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  newExpenseButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 32,
  },
  newExpenseIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  newExpenseText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  debtCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  debtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  debtPerson: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  debtStatusLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'right',
  },
  debtAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  debtOrigin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
  },
  debtOriginText: {
    color: '#475569',
    fontWeight: '500',
  },
  debtDate: {
    color: '#94a3b8',
    fontSize: 12,
  }
});
