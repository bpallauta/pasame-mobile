import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';

const MOCK_TEAMS = [
  { id: 1, name: 'Oficina', members: 12, emoji: '💼' },
  { id: 2, name: 'Amigos', members: 8, emoji: '🍻' },
  { id: 3, name: 'Familia', members: 5, emoji: '🏠' }
];

export default function TeamsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Tus equipos</Text>
        
        <Text style={styles.sectionTitle}>Mis equipos</Text>
        
        {MOCK_TEAMS.map(team => (
          <TouchableOpacity 
            key={team.id} 
            style={styles.teamCard}
            onPress={() => navigation.navigate('TeamDetail', { team })}
          >
            <View style={styles.teamIcon}>
              <Text style={styles.teamIconText}>{team.emoji}</Text>
            </View>
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{team.name}</Text>
              <Text style={styles.teamMembers}>{team.members} integrantes</Text>
            </View>
            <Text style={styles.chevron}>❯</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.createTeamButton}>
          <Text style={styles.createTeamIcon}>+</Text>
          <Text style={styles.createTeamText}>Crear nuevo equipo</Text>
        </TouchableOpacity>
        
        <View style={{height: 40}}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 16,
  },
  teamCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
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
  teamIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  teamIconText: {
    fontSize: 24,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  teamMembers: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 18,
    color: colors.textLight,
  },
  createTeamButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 20,
    marginTop: 16,
    backgroundColor: 'transparent',
  },
  createTeamIcon: {
    fontSize: 24,
    color: colors.primary,
    marginRight: 8,
    fontWeight: '800',
  },
  createTeamText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  }
});
