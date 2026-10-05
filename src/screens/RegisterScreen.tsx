import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!name || !email || !password) return;
    setIsLoading(true);
    const success = await register(name, email, password);
    setIsLoading(false);
    // Si success es true, App.tsx cambiará a MainTabs automáticamente
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Únete a Pásame y empieza a cuadrar cuentas sin estrés.</Text>
          
          <View style={styles.form}>
            <TextInput 
              style={styles.input} 
              placeholder="Nombre de pila (ej: Benjamín)" 
              placeholderTextColor={colors.gray400}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            <TextInput 
              style={styles.input} 
              placeholder="Correo electrónico" 
              placeholderTextColor={colors.gray400}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput 
              style={styles.input} 
              placeholder="Contraseña" 
              placeholderTextColor={colors.gray400}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity 
              style={[globalStyles.buttonPrimary, { marginTop: 16 }]} 
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={globalStyles.buttonPrimaryText}>Registrarme</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => navigation.goBack()}
              disabled={isLoading}
            >
              <Text style={styles.secondaryButtonText}>¿Ya tienes cuenta? Inicia Sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray600,
    textAlign: 'center',
    marginBottom: 48,
    paddingHorizontal: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: colors.gray900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  secondaryButton: {
    marginTop: 24,
    alignItems: 'center',
    padding: 10,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  }
});
