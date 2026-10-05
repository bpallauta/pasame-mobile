import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro que deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sí, salir', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mi Perfil</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Text>
          </View>
          
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>

          <View style={[styles.roleBadge, { backgroundColor: user?.role === 'admin' ? '#FEF3C7' : '#E0F2FE' }]}>
            <Text style={styles.roleText}>{user?.role === 'admin' ? 'Administrador' : 'Usuario'}</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🏦</Text>
            <Text style={styles.actionText}>Mis Datos Bancarios (Pronto)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>⚙️</Text>
            <Text style={styles.actionText}>Ajustes de la App</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
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
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  infoCard: {
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: colors.gray900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  roleText: {
    color: '#0f172a',
    fontWeight: '600',
    fontSize: 14,
  },
  actionsContainer: {
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  actionText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#FEE2E2', // red-100
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  logoutButtonText: {
    color: '#DC2626', // red-600
    fontSize: 16,
    fontWeight: 'bold',
  }
});
