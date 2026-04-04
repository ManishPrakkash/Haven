import React, { useRef, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';

import { BrandColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const { height } = Dimensions.get('window');

export default function DigitalSignatureScreen() {
  const signatureRef = useRef<SignatureViewRef>(null);
  const [hasSigned, setHasSigned] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleOK = async (signature: string) => {
    try {
      // Finalize Parametric Contract in Supabase
      console.log('Signature captured, syncing to Supabase...');
      
      const response = await fetch('http://localhost:3000/policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: '1', // Default partner for demo
          plan_type: 'Economy',
          risk_zone: 'Chennai',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Policy created:', data.policy_id);
        
        // Ensure visual feedback delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/identity-verified-summary');
      } else {
        console.error('Failed to create policy');
      }
    } catch (e) {
      console.error('Finalization failed');
    }
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
    setHasSigned(false);
  };

  const handleConfirm = () => {
    signatureRef.current?.readSignature();
  };

  const onBegin = () => {
    setHasSigned(true);
    setScrollEnabled(false);
  };

  const onEnd = () => {
    setScrollEnabled(true);
  };

  // Custom styles for the signature pad
  const signatureStyle = `
    body, html {
      background-color: transparent;
      width: 100%;
      height: 100%;
      touch-action: none;
      margin: 0;
      padding: 0;
    }
    .m-signature-pad { 
      box-shadow: none; 
      border: none; 
      background-color: transparent;
      width: 100%;
      height: 100%;
    }
    .m-signature-pad--body { 
      border: none; 
      background-color: transparent;
      bottom: 0px;
    }
    .m-signature-pad--footer { 
      display: none; 
    }
  `;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" translucent />

      {/* Blue Header Gradient */}
      <LinearGradient
        colors={['#004771', '#007A8B']}
        style={[styles.headerGradient, { height: height * 0.35 }]}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerIconButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Typography variant="bodySemiBold" color="white" style={styles.headerTitle}>
            Digital Signature
          </Typography>
          <TouchableOpacity style={styles.headerIconButton}>
            <MaterialCommunityIcons name="fountain-pen" size={22} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
          scrollEnabled={scrollEnabled}
        >
          {/* Top Info */}
          <View style={styles.topInfo}>
            <View style={styles.penIconCircle}>
              <MaterialCommunityIcons name="pencil" size={24} color="white" />
            </View>
            <Typography variant="h3" color="white" style={styles.signToConfirmText}>
              Sign to Confirm
            </Typography>
            <Typography variant="caption" color="rgba(255, 255, 255, 0.8)">
              Your digital signature acts as your legal consent
            </Typography>
          </View>

          {/* Main Card */}
          <View style={styles.card}>
            <View style={styles.identificationRow}>
              <Typography variant="body" style={styles.identificationText}>
                I, <Typography variant="bodySemiBold" style={{ color: '#007A8B' }}>Ravi Kumar</Typography>, agree to the <Typography variant="bodySemiBold">Economy Plan terms</Typography>
              </Typography>
            </View>

            <Typography variant="caption" color={BrandColors.text.secondary} style={styles.instructionText}>
              Draw your signature in the box below using your finger.
            </Typography>

            {/* Signature Area Container */}
            <View style={styles.signaturePadWrapper}>
              <View style={styles.signaturePadBackground}>
                 <View style={styles.gridContainer}>
                    {[...Array(12)].map((_, i) => (
                      <View key={i} style={styles.gridRow}>
                        {[...Array(10)].map((_, j) => (
                          <View key={j} style={styles.gridDot} />
                        ))}
                      </View>
                    ))}
                 </View>
                 <View style={styles.signHereOverlay}>
                    {!hasSigned && (
                      <>
                        <Typography variant="h1" style={styles.signHereText}>Sign here</Typography>
                        <View style={styles.signLine} />
                      </>
                    )}
                 </View>
                 <SignatureScreen
                    ref={signatureRef}
                    onBegin={onBegin}
                    onEnd={onEnd}
                    onOK={handleOK}
                    onEmpty={() => console.log('Empty signature')}
                    descriptionText=""
                    clearText="Clear"
                    confirmText="Confirm"
                    webStyle={signatureStyle}
                    backgroundColor="transparent"
                 />
              </View>
            </View>

            {/* Clear Button */}
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Ionicons name="refresh" size={16} color={BrandColors.text.secondary} style={{ marginRight: 6 }} />
              <Typography variant="caption" color={BrandColors.text.secondary}>
                Clear
              </Typography>
            </TouchableOpacity>

            {/* Legal Text Box */}
            <View style={styles.legalBox}>
              <Typography variant="caption" color={BrandColors.text.secondary} style={styles.legalText}>
                By signing above, I Ravi Kumar confirm that I have voluntarily agreed to enroll in the GigShield Economy Plan. I have read and understood all policy terms. This digital signature has the same legal validity as a handwritten signature under the Information Technology Act 2000 (India).
              </Typography>
              <Typography variant="caption" color={BrandColors.text.muted} style={styles.signedDateText}>
                Signed on 24 May, 2024
              </Typography>

              {/* Support Icon */}
              <TouchableOpacity style={styles.supportButton}>
                 <Ionicons name="headset-outline" size={20} color="#007A8B" />
              </TouchableOpacity>
            </View>

            {/* Footer Hint */}
            <View style={styles.footerHint}>
               <Ionicons name="information-circle" size={16} color={BrandColors.text.secondary} style={{ marginRight: 8 }} />
               <Typography variant="caption" color={BrandColors.text.secondary}>
                 Please sign above to continue
               </Typography>
            </View>

            {/* Main Action Action */}
            <Button 
               title="Confirm Signature & Proceed to Payment" 
               onPress={handleConfirm}
               style={styles.confirmButton}
               rightIcon={<Ionicons name="chevron-forward" size={18} color="white" />}
            />

            <Typography variant="caption" color={BrandColors.text.muted} align="center" style={styles.securityNote}>
              Secured with 256-bit encryption. All interactions are recorded for verification purposes.
            </Typography>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topInfo: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  penIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  signToConfirmText: {
    marginBottom: 4,
    fontWeight: '700',
  },
  card: {
    backgroundColor: 'white',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 40,
    flex: 1,
    minHeight: height * 0.7,
  },
  identificationRow: {
    marginBottom: 12,
  },
  identificationText: {
    fontSize: 16,
    lineHeight: 22,
  },
  instructionText: {
    marginBottom: 20,
  },
  signaturePadWrapper: {
    height: 200,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    borderStyle: 'dashed',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F8FAFC',
  },
  signaturePadBackground: {
    flex: 1,
  },
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
    padding: 10,
    justifyContent: 'space-between',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridDot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#CBD5E1',
  },
  signHereOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  signHereText: {
    fontSize: 40,
    color: '#E2E8F0',
    fontWeight: '300',
  },
  signLine: {
    width: '80%',
    height: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 20,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
    marginBottom: 24,
  },
  legalBox: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    marginBottom: 32,
  },
  legalText: {
    lineHeight: 18,
    fontSize: 11,
    marginBottom: 12,
  },
  signedDateText: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  supportButton: {
    position: 'absolute',
    bottom: -24,
    right: 0,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  footerHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#fa5800ff', // Primary button color from design
    height: 64,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#FAAF86',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  securityNote: {
    fontSize: 10,
    lineHeight: 14,
    paddingHorizontal: 20,
  },
});
