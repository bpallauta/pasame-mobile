import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ActivityIndicator, SafeAreaView, Animated } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';

const API_URL = 'https://pasame-api.onrender.com'; // Backend en la nube (Render)

export default function CameraScreen({ navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const cameraRef = useRef<any>(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 16, color: '#fff' }}>Pásame necesita acceso a tu cámara para leer boletas.</Text>
        <Button onPress={requestPermission} title="Otorgar permiso" />
      </View>
    );
  }

  const simulateLoadingSteps = () => {
    setLoadingStep(0);
    setTimeout(() => setLoadingStep(1), 2000);
    setTimeout(() => setLoadingStep(2), 4000);
    setTimeout(() => setLoadingStep(3), 6000);
    setTimeout(() => setLoadingStep(4), 8000);
  };

  const processImage = async (base64String: string | undefined) => {
    if (!base64String) return;
    try {
      setLoading(true);
      simulateLoadingSteps();
      
      const response = await fetch(`${API_URL}/api/v1/bills/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image_base64: base64String })
      });
      
      const billData = await response.json();
      setLoading(false);
      navigation.replace('ReviewBill', { billData });
    } catch (error) {
      console.error(error);
      alert('Error al procesar la boleta. Verifica que el backend esté corriendo en la misma red WiFi.');
      setLoading(false);
    }
  };

  const handleTakePicture = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      await processImage(photo.base64);
    } catch (error) {
      console.error(error);
      alert('La cámara falló (quizás estás en un emulador). Intenta subirla desde la galería.');
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        await processImage(result.assets[0].base64);
      }
    } catch (error) {
      console.error(error);
      alert('Error al seleccionar la imagen.');
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <View style={styles.loadingHeader}>
          <Text style={{fontSize: 80}}>🧾</Text>
          <Text style={styles.loadingTitle}>Estamos leyendo tu boleta...</Text>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(loadingStep / 4) * 100}%` }]} />
        </View>

        <View style={styles.stepsContainer}>
          <View style={styles.stepRow}>
            <Text style={styles.stepIcon}>{loadingStep >= 1 ? '✅' : '⚪'}</Text>
            <Text style={[styles.stepText, loadingStep >= 1 && styles.stepTextActive]}>Detectando restaurante</Text>
          </View>
          <View style={styles.stepRow}>
            <Text style={styles.stepIcon}>{loadingStep >= 2 ? '✅' : '⚪'}</Text>
            <Text style={[styles.stepText, loadingStep >= 2 && styles.stepTextActive]}>Leyendo productos</Text>
          </View>
          <View style={styles.stepRow}>
            <Text style={styles.stepIcon}>{loadingStep >= 3 ? '✅' : '⚪'}</Text>
            <Text style={[styles.stepText, loadingStep >= 3 && styles.stepTextActive]}>Reconociendo totales</Text>
          </View>
          <View style={styles.stepRow}>
            <Text style={styles.stepIcon}>{loadingStep >= 4 ? '✅' : '⚪'}</Text>
            <Text style={[styles.stepText, loadingStep >= 4 && styles.stepTextActive]}>Organizando la información</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={{color: '#fff', fontSize: 20}}>❮</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pon la boleta dentro del recuadro</Text>
        <View style={{width: 40}} />
      </View>

      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
        <View style={styles.overlay}>
          <View style={styles.scanFrame} />
        </View>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.sideButton} onPress={handlePickImage}>
          <Text style={{fontSize: 24}}>🖼️</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.captureButtonOuter} onPress={handleTakePicture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sideButton} onPress={toggleCameraFacing}>
          <Text style={{fontSize: 24}}>🔄</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', // Dim background outside frame
  },
  scanFrame: {
    width: '80%',
    height: '60%',
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
    borderRadius: 16,
  },
  bottomBar: {
    height: 120,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
  },
  sideButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  // Loading Screen Styles
  loadingScreen: {
    flex: 1,
    backgroundColor: '#0F172A', // Dark Slate
    padding: 30,
    justifyContent: 'center',
  },
  loadingHeader: {
    alignItems: 'center',
    marginBottom: 50,
  },
  loadingTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 24,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#1E293B',
    borderRadius: 4,
    marginBottom: 40,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  stepsContainer: {
    gap: 20,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  stepText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '500',
  },
  stepTextActive: {
    color: '#fff',
  },
});
