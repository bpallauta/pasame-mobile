import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';

import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  
  // Extraemos el primer nombre para el saludo (si existe)
  const firstName = user?.name ? user.name.split(' ')[0] : 'Invitado';

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.logo}>Pásame</Text>
          <Text style={styles.header}>Hola, {firstName} 👋</Text>
          <Text style={styles.subHeader}>¿Qué quieres hacer?</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Text style={{fontSize: 24}}>👨</Text>
        </View>
      </View>
      
      <TouchableOpacity style={[styles.mainCard, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('NewBill')}>
        <View style={styles.cardTopRow}>
          <Text style={{fontSize: 24}}>🍽️</Text>
          <Text style={styles.cardTitle}>Dividir una cuenta</Text>
        </View>
        <Text style={styles.cardText}>Sube una boleta y reparte el consumo.</Text>
        <View style={styles.cardButtonWhite}>
          <Text style={[styles.cardButtonText, { color: colors.primary }]}>Nueva cuenta</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.mainCard, { backgroundColor: colors.secondary }]} onPress={() => navigation.navigate('Debts')}>
        <View style={styles.cardTopRow}>
          <Text style={{fontSize: 24}}>💸</Text>
          <Text style={styles.cardTitle}>Cuadrar deudas</Text>
        </View>
        <Text style={styles.cardText}>Revisa quién debe y quién tiene que recibir.</Text>
        <View style={styles.cardButtonWhite}>
          <Text style={[styles.cardButtonText, { color: colors.secondary }]}>Ver mis deudas</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Tus pendientes</Text>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceBox}>
          <View style={styles.balanceRow}>
            <Text style={{fontSize: 16}}>⬇️</Text>
            <Text style={styles.balanceLabel}> Te deben</Text>
          </View>
          <Text style={[styles.balanceAmount, { color: colors.success }]}>$45.000</Text>
        </View>
        <View style={styles.balanceBox}>
          <View style={styles.balanceRow}>
            <Text style={{fontSize: 16}}>⬆️</Text>
            <Text style={styles.balanceLabel}> Tú debes</Text>
          </View>
          <Text style={[styles.balanceAmount, { color: colors.error }]}>$18.500</Text>
        </View>
      </View>

      <View style={styles.lastBillsHeader}>
        <Text style={styles.sectionTitle}>Últimas cuentas</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Ver todas</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.historyCard}>
        <View style={styles.historyIcon}>
          <Text style={{fontSize: 20}}>🧾</Text>
        </View>
        <View style={styles.historyInfo}>
          <Text style={styles.historyTitle}>Restaurante XYZ</Text>
          <Text style={styles.historySubtitle}>$88.000 • 4 personas</Text>
        </View>
        <View style={styles.historyBadge}>
          <Text style={styles.historyBadgeText}>2 pagos pendientes</Text>
        </View>
        <Text style={{fontSize: 16}}>›</Text>
      </TouchableOpacity>
      
      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    marginBottom: 20,
  },
  logo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCard: {
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.surface,
    marginLeft: 12,
  },
  cardText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
    lineHeight: 22,
  },
  cardButtonWhite: {
    backgroundColor: colors.surface,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cardButtonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 16,
  },
  balanceContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  balanceBox: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 22,
    fontWeight: '800',
  },
  lastBillsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 24,
    marginTop: 10,
  },
  seeAllText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  historyCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  historyIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  historySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  historyBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  historyBadgeText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '700',
  }
});
