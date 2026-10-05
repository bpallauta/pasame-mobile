import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';

export default function NewBillScreen({ navigation }: any) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 20}}>❮</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>¿Cómo quieres ingresar la cuenta?</Text>
        
        <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('Camera')}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📷</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Sacar foto</Text>
            <Text style={styles.optionSubtitle}>Usa la cámara de tu teléfono</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🖼️</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Elegir foto</Text>
            <Text style={styles.optionSubtitle}>Desde tu galería</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('ManualExpense')}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✏️</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Ingresar manualmente</Text>
            <Text style={styles.optionSubtitle}>Sin fotografía</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 40,
    lineHeight: 40,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F1F5F9', // light gray/blue
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  }
});
