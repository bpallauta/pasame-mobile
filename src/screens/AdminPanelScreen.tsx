import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';

export default function AdminPanelScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Panel de Control</Text>
        <Text style={styles.subtitle}>👑 Acceso exclusivo Administrador</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bienvenido, {user?.name}</Text>
          <Text style={styles.cardText}>Tu nivel de acceso es: Superior ({user?.role})</Text>
        </View>

        <TouchableOpacity style={styles.adminButton}>
          <Text style={styles.adminButtonText}>👀 Ver todos los usuarios (Próximamente)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.adminButton}>
          <Text style={styles.adminButtonText}>💰 Ver ingresos totales (Próximamente)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.adminButton}>
          <Text style={styles.adminButtonText}>⚙️ Configuración del Sistema (Próximamente)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#F59E0B', // amber-500
    fontWeight: 'bold',
    marginBottom: 32,
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FDE68A', // amber-200
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 32,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: colors.gray600,
  },
  adminButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  adminButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  }
});
