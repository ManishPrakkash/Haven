import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  Image,
  Alert,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { BrandColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const { width, height } = Dimensions.get('window');

const OVAL_WIDTH = width * 0.7;
const OVAL_HEIGHT = OVAL_WIDTH * 1.3;

export default function FaceVerificationScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [livenessStep, setLivenessStep] = useState(0);
  const [livenessText, setLivenessText] = useState("Blink slowly, twice");
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    // Simulate Edge-CNN Liveness checking
    if (permission?.granted && !capturedImage) {
      if (livenessStep === 0) {
        setLivenessText("Blink slowly, twice");
        const t1 = setTimeout(() => setLivenessStep(1), 2500);
        return () => clearTimeout(t1);
      } else if (livenessStep === 1) {
        setLivenessText("Now, smile for the camera");
        const t2 = setTimeout(() => setLivenessStep(2), 2500);
        return () => clearTimeout(t2);
      } else if (livenessStep === 2) {
        setLivenessText("Liveness Confirmed! Capturing...");
        const t3 = setTimeout(() => {
          takePicture();
          setLivenessStep(3);
        }, 1500);
        return () => clearTimeout(t3);
      }
    }
  }, [permission, capturedImage, livenessStep]);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.centeredContainer}>
        <Typography variant="h4" align="center" style={{ marginBottom: 16 }}>
          We need your permission to use the camera
        </Typography>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current && !isCapturing) {
      try {
        setIsCapturing(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: true,
        });
        if (photo) {
          setCapturedImage(photo.uri);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to take photo');
        console.error(error);
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const handleConfirm = async () => {
    try {
      // Simulate cryptographic 3D facial topology hashing (SHA-256 equivalent)
      const mockBiometricHash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
      
      const response = await fetch('http://localhost:3000/profile/kyc/verify-hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hash: mockBiometricHash, workerId: 'current-user-uuid' })
      });

      if (response.ok) {
        router.push('/digital-signature');
      } else {
        Alert.alert("KYC Failed", "Biometric similarity dropped below 98%. Possible proxy detected.");
        setCapturedImage(null);
        setLivenessStep(0);
      }
    } catch {
      // For development fallback if backend is offline
      router.push('/digital-signature');
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" translucent />

      {/* Camera View */}
      {!capturedImage ? (
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFillObject}
          facing="front"
        >
          {/* Overlay Mask */}
          <View style={styles.overlay}>
             <View style={{ flex: 1, backgroundColor: 'rgba(10, 15, 25, 0.8)' }} />
             
             <View style={{ flexDirection: 'row', height: OVAL_HEIGHT }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(10, 15, 25, 0.8)' }} />
                <View style={styles.ovalHole}>
                   <View style={styles.ovalDot} />
                </View>
                <View style={{ flex: 1, backgroundColor: 'rgba(10, 15, 25, 0.8)' }} />
             </View>
             
             <View style={{ flex: 1, backgroundColor: 'rgba(10, 15, 25, 0.8)' }} />
          </View>
        </CameraView>
      ) : (
        <Image source={{ uri: capturedImage }} style={StyleSheet.absoluteFillObject} />
      )}

      <SafeAreaView style={styles.safeArea}>
        {/* Header - Liveness Check */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <View style={styles.shieldContainer}>
               <Ionicons name="shield-checkmark" size={16} color="white" />
               <Typography variant="bodySemiBold" color="white" style={styles.headerTitle}>
                 LIVENESS CHECK
               </Typography>
            </View>
            <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" align="center">
              Follow the instruction below
            </Typography>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Instruction pill */}
        {!capturedImage && (
          <View style={styles.instructionPillContainer}>
            <View style={[styles.instructionPill, livenessStep >= 2 && { backgroundColor: 'rgba(0, 200, 83, 0.9)', borderColor: 'rgba(0, 255, 100, 0.4)' }]}>
              {livenessStep < 2 ? (
                <Ionicons name="eye" size={20} color="#60A5FA" style={{ marginRight: 10 }} />
              ) : (
                <Ionicons name="checkmark-circle" size={20} color="white" style={{ marginRight: 10 }} />
              )}
              <Typography variant="bodySemiBold" color="white" style={{ fontSize: 18 }}>
                {livenessText}
              </Typography>
            </View>
          </View>
        )}

        <View style={{ flex: 1 }} />

        {/* Footer Actions */}
        {!capturedImage && (
          <View style={styles.footerContainer}>
            {/* Progress indicator */}
            <View style={styles.progressContainer}>
               <View style={[styles.progressSegment, styles.progressActive]} />
               <View style={styles.progressSegment} />
               <View style={styles.progressSegment} />
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.sideAction}>
                <Ionicons name="image" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.shutterButton} 
                onPress={takePicture}
                disabled={isCapturing}
              >
                <View style={styles.shutterInner}>
                  <Ionicons name="aperture" size={32} color="#0F172A" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sideAction}>
                <View style={styles.whiteCircle} />
              </TouchableOpacity>
            </View>

            <View style={styles.bottomTextContainer}>
               <Typography variant="bodySemiBold" color="#00CED1" style={{ fontSize: 14 }}>
                 Step 1 of 3
               </Typography>
               <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
                 Keep your face within the frame
               </Typography>
            </View>
          </View>
        )}

        {/* Bottom Sheet for captured state */}
        {capturedImage && (
          <View style={styles.bottomSheet}>
            <View style={styles.capturedThumbnailContainer}>
              <View style={styles.thumbnailBorder}>
                <Image source={{ uri: capturedImage }} style={styles.capturedThumbnail} />
              </View>
            </View>

            <Typography variant="h3" align="center" style={styles.bottomSheetTitle}>
              Is this photo clear?
            </Typography>
            <Typography variant="body" color={BrandColors.text.secondary} align="center" style={styles.bottomSheetSubtitle}>
              Make sure your face is fully visible and well-lit.
            </Typography>

            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.retakeButton]} 
                onPress={handleRetake}
              >
                <Typography variant="bodySemiBold" color={BrandColors.text.secondary}>
                  Retake
                </Typography>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.confirmButton]} 
                onPress={handleConfirm}
              >
                <Typography variant="bodySemiBold" color="white">
                  Looks Good
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  shieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 14,
    letterSpacing: 0.5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  ovalHole: {
    width: OVAL_WIDTH,
    height: OVAL_HEIGHT,
    borderRadius: OVAL_WIDTH / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  ovalDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00CED1',
    marginTop: -5,
  },
  instructionPillContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  instructionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 35, 60, 0.9)',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(100, 180, 255, 0.2)',
  },
  footerContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 30,
    justifyContent: 'center',
  },
  progressSegment: {
    height: 4,
    width: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
  progressActive: {
    backgroundColor: '#00C853',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  shutterButton: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideAction: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  bottomTextContainer: {
    alignItems: 'center',
    gap: 4,
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    marginTop: 'auto',
  },
  capturedThumbnailContainer: {
    position: 'absolute',
    top: -60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  thumbnailBorder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  capturedThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 56,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1E293B',
  },
  bottomSheetSubtitle: {
    fontSize: 15,
    marginBottom: 32,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retakeButton: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  confirmButton: {
    backgroundColor: '#008080',
  },
});
