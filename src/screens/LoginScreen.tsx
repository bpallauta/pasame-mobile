import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    // Si success es true, App.tsx automáticamente cambiará a MainTabs porque token no será null
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Pásame</Text>
        <Text style={styles.subtitle}>Tú disfruta la comida. Pásame se preocupa de cuadrar la cuenta.</Text>
        
        <View style={styles.form}>
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
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={globalStyles.buttonPrimaryText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => navigation.navigate('Register')}
            disabled={isLoading}
          >
            <Text style={styles.secondaryButtonText}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3b82f6',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 48,
    paddingHorizontal: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#3b82f6',
    fontSize: 16,
  }
});
