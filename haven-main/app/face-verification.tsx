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
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

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

  const handleConfirm = () => {
    router.push('/verified-success');
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
             {/* Top Mask */}
             <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />
             
             {/* Center Row with Oval Hole */}
             <View style={{ flexDirection: 'row', height: OVAL_HEIGHT }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />
                <View style={styles.ovalHole} />
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />
             </View>
             
             {/* Bottom Mask */}
             <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />
          </View>
        </CameraView>
      ) : (
        <Image source={{ uri: capturedImage }} style={StyleSheet.absoluteFillObject} />
      )}

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <Typography variant="bodySemiBold" color="white" style={styles.headerTitle}>
            Face Verification
          </Typography>
          <View style={{ width: 40 }} />
        </View>

        {/* Instructions */}
        {!capturedImage && (
          <View style={styles.instructionContainer}>
            <Typography variant="h4" color="white" align="center" style={styles.instructionMain}>
              Position your face inside the oval
            </Typography>
            <Typography variant="body" color="rgba(255, 255, 255, 0.8)" align="center" style={styles.instructionSub}>
              Ensure good lighting and remove glasses
            </Typography>
          </View>
        )}

        <View style={{ flex: 1 }} />

        {/* Capture Button (only when not captured) */}
        {!capturedImage && (
          <View style={styles.captureContainer}>
            <TouchableOpacity 
              style={styles.captureButton} 
              onPress={takePicture}
              disabled={isCapturing}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
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
    backgroundColor: 'black',
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
    paddingHorizontal: 20,
    height: 56,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  ovalHole: {
    width: OVAL_WIDTH,
    height: OVAL_HEIGHT,
    borderRadius: OVAL_WIDTH / 2,
    borderWidth: 3,
    borderColor: '#00C853',
    backgroundColor: 'transparent',
  },
  instructionContainer: {
    marginTop: 20,
    paddingHorizontal: 40,
  },
  instructionMain: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  instructionSub: {
    fontSize: 14,
  },
  captureContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 60, // Space for the floating thumbnail
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
    backgroundColor: '#008080', // Teal-ish color from design
  },
});
