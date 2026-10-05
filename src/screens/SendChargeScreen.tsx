import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';

export default function SendChargeScreen({ route, navigation }: any) {
  const { billData, calculation } = route.params;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // We filter out the user themselves from being charged (assuming ID 1 is self for MVP)
  const peopleToCharge = calculation.finalBalances.filter((p: any) => p.id !== 1 && p.finalTotal > 0);

  const handleSendCharges = () => {
    setLoading(true);
    // Simulate backend call to POST /bills/{id}/send
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleWhatsAppShare = (person: any) => {
    const amount = Math.round(person.finalTotal).toLocaleString('es-CL');
    const message = `Hola ${person.name} 👋\nEn la cuenta de ${billData?.restaurant || 'el restaurante'} te tocó pagar $${amount}.\nPuedes revisar el detalle aquí: https://pasame.app/debts/mock-id-123`;
    
    // In React Native, Linking.openURL with whatsapp scheme opens the app
    Linking.openURL(`whatsapp://send?text=${encodeURIComponent(message)}`).catch(() => {
      alert('Asegúrate de tener WhatsApp instalado');
    });
  };

  if (success) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successCard}>
            <Text style={styles.iconGiant}>✅</Text>
            <Text style={styles.title}>¡Cobros enviados!</Text>
            <Text style={styles.subtitle}>Hemos enviado un correo automático a todos los participantes con el detalle y tus datos de transferencia.</Text>
          </View>

          <Text style={styles.sectionTitle}>Compartir por WhatsApp</Text>
          
          {peopleToCharge.map((p: any) => (
            <TouchableOpacity 
              key={p.id} 
              style={styles.whatsappButton}
              onPress={() => handleWhatsAppShare(p)}
            >
              <Text style={styles.whatsappIcon}>💬</Text>
              <Text style={styles.whatsappText}>Cobrar a {p.name}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={[globalStyles.buttonSecondary, {marginTop: 'auto'}]} onPress={() => navigation.navigate('MainTabs')}>
            <Text style={globalStyles.buttonSecondaryText}>Volver al Inicio</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.containerCenter}>
        <Text style={styles.iconGiant}>📩</Text>
        <Text style={styles.title}>Pásame la plata</Text>
        <Text style={styles.subtitle}>
          Se crearán {peopleToCharge.length} cobros y se enviarán notificaciones por correo a los participantes.
        </Text>

        {loading ? (
          <View style={{ alignItems: 'center', marginTop: 32 }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ marginTop: 16, color: colors.textSecondary, fontWeight: '600' }}>Generando deudas...</Text>
          </View>
        ) : (
          <TouchableOpacity style={[globalStyles.buttonPrimary, {width: '100%', marginTop: 20}]} onPress={handleSendCharges}>
            <Text style={globalStyles.buttonPrimaryText}>Enviar cobros</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  successContainer: {
    flex: 1,
    padding: 24,
  },
  containerCenter: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGiant: {
    fontSize: 72,
    marginBottom: 16,
    textAlign: 'center',
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
    marginBottom: 32,
    paddingHorizontal: 16,
    lineHeight: 22,
  },
  successCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  whatsappIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  whatsappText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  }
});
