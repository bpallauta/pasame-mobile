import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';

const MOCK_BALANCES = [
  { id: 1, name: 'Benjamín', balance: 45000 },
  { id: 2, name: 'Ana', balance: -20000 },
  { id: 3, name: 'Pedro', balance: -15000 },
  { id: 4, name: 'Juan', balance: -10000 },
];

export default function TeamDetailScreen({ route, navigation }: any) {
  const { team } = route.params;

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 20}}>❮</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{team.emoji} {team.name}</Text>
        <Text style={styles.subtitle}>{team.members} integrantes</Text>
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Balance actual</Text>
          <View style={styles.divider} />
          
          {MOCK_BALANCES.map(member => {
            const isPositive = member.balance > 0;
            return (
              <View key={member.id} style={styles.balanceRow}>
                <View style={styles.memberInfo}>
                  <View style={styles.avatar}>
                    <Text style={{fontSize: 14}}>👤</Text>
                  </View>
                  <Text style={styles.memberName}>{member.name}</Text>
                </View>
                <Text style={[styles.memberBalance, { color: isPositive ? colors.primary : '#ef4444' }]}>
                  {isPositive ? '🟢 +' : '🔴 -'}${Math.abs(member.balance).toLocaleString('es-CL')}
                </Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity style={globalStyles.buttonSecondary} onPress={() => navigation.navigate('SimplifyDebts')}>
          <Text style={{fontSize: 20, marginRight: 8}}>✨</Text>
          <Text style={globalStyles.buttonSecondaryText}>Simplificar deudas</Text>
        </TouchableOpacity>
        
        <View style={{height: 40}}/>
      </ScrollView>
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
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32,
    fontWeight: '500',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 16,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  memberName: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  memberBalance: {
    fontSize: 16,
    fontWeight: '700',
  },
});
