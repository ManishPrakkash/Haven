import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { workerService } from '../../services/mock.services';
import { useUserStore } from '../../store/user.store';
import { Colors } from '../../constants/colors';

function formatWorkerId(raw: string): string {
  const cleaned = raw.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 5) return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
  return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5, 11)}`;
}

function validateWorkerId(id: string): boolean {
  return /^SW-[A-Z]{3}-\d{6}$/.test(id);
}

export default function WorkerVerifyScreen() {
  const [workerId, setWorkerId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState('Swiggy');
  const { setVerifiedWorker } = useUserStore();

  const handleChange = (text: string) => {
    const formatted = formatWorkerId(text);
    setWorkerId(formatted);
    setIsValid(validateWorkerId(formatted));
    setError(null);
  };

  const handleVerify = async () => {
    if (!isValid || loading) return;
    Keyboard.dismiss();
    setLoading(true);
    setError(null);
    try {
      const result = await workerService.verifyWorkerId(workerId);
      setVerifiedWorker(result);
      router.push('/(auth)/verify-success');
    } catch (err: any) {
      const msg = err.response?.data?.message ?? 'Verification failed. Try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const borderColor = error ? Colors.error : isValid ? Colors.success : workerId.length > 0 ? Colors.teal : Colors.border;

  return (
    <View style={styles.root}>
      <LinearGradient colors={[Colors.navy, Colors.teal]} style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.stepRow}>
            {[1, 2, 3].map(i => (
              <View key={i} style={[styles.stepDot, i === 1 && styles.stepDotActive]} />
            ))}
          </View>
          <Text style={styles.stepLabel}>STEP 1 OF 3</Text>
          <View style={styles.iconCircle}>
            <Ionicons name="shield-checkmark" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>Partner Verification</Text>
          <Text style={styles.headerSubtitle}>Confirm you're an active delivery partner</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.card} contentContainerStyle={styles.cardContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Which platform do you deliver for?</Text>
        <View style={styles.platformRow}>
          {['Swiggy', 'Zomato', 'Amazon', 'Zepto'].map(p => (
            <TouchableOpacity
              key={p}
              style={[styles.platformChip, selectedPlatform === p && styles.platformChipActive]}
              onPress={() => {
                if (p !== 'Swiggy') {
                  Alert.alert('Not Supported', `${p} is not supported in this version.`);
                } else {
                  setSelectedPlatform(p);
                }
              }}
            >
              <Text style={[styles.platformLabel, selectedPlatform === p && styles.platformLabelActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { marginTop: 24 }]}>Your Delivery Partner ID</Text>
        <View style={[styles.inputContainer, { borderColor }]}>
          <TextInput
            style={styles.input}
            value={workerId}
            onChangeText={handleChange}
            placeholder="SW-CHE-004821"
            placeholderTextColor={Colors.textHint}
            autoCapitalize="characters"
            maxLength={14}
            keyboardType="default"
          />
          {isValid && <Ionicons name="checkmark-circle" size={20} color={Colors.success} />}
        </View>

        {error ? (
          <View style={styles.errorRow}>
            <Ionicons name="close-circle" size={14} color={Colors.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <View style={styles.helperRow}>
            <Ionicons name="information-circle-outline" size={14} color={Colors.textHint} />
            <Text style={styles.helperText}>Find your ID in the Swiggy Partner app profile section.</Text>
          </View>
        )}

        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={18} color={Colors.orange} />
          <Text style={styles.tipText}>
            Open Swiggy Partner App → Tap photo → Your ID is shown below name.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.btn, !isValid && styles.btnDisabled]}
          onPress={handleVerify}
          disabled={!isValid || loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.btnText}>Verify My ID</Text>
          )}
        </TouchableOpacity>

        <View style={styles.trustRow}>
          <Ionicons name="lock-closed-outline" size={12} color={Colors.textHint} />
          <Text style={styles.trustText}>VERIFICATION IS INSTANT AND FREE</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: { height: '40%', paddingTop: 50, paddingHorizontal: 20 },
  back: { marginBottom: 8 },
  headerContent: { alignItems: 'center', flex: 1, justifyContent: 'center', paddingBottom: 40 },
  stepRow: { flexDirection: 'row', gap: 8 },
  stepDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
  stepDotActive: { backgroundColor: '#FFFFFF', width: 20, borderRadius: 4 },
  stepLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 6, letterSpacing: 1 },
  iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginTop: 12 },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  card: {
    flex: 1, backgroundColor: Colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    marginTop: -30,
  },
  cardContent: { padding: 24, paddingTop: 28 },
  label: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary, marginBottom: 10 },
  platformRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  platformChip: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20,
    borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.card,
  },
  platformChipActive: { backgroundColor: Colors.navy, borderColor: Colors.navy },
  platformLabel: { fontSize: 13, color: Colors.textSecondary },
  platformLabelActive: { color: '#FFFFFF', fontWeight: '600' },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderRadius: 12,
    paddingHorizontal: 16, height: 56, backgroundColor: '#F8FAFC',
  },
  input: { flex: 1, fontSize: 17, color: Colors.textPrimary, letterSpacing: 1 },
  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  errorText: { fontSize: 12, color: Colors.error },
  helperRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  helperText: { fontSize: 11, color: Colors.textHint },
  tipCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20,
    backgroundColor: Colors.warningBg, padding: 14, borderRadius: 12,
  },
  tipText: { flex: 1, fontSize: 12, color: Colors.warning, lineHeight: 18 },
  btn: {
    backgroundColor: Colors.orange, borderRadius: 12, height: 52,
    alignItems: 'center', justifyContent: 'center', marginTop: 28,
  },
  btnDisabled: { backgroundColor: Colors.textDisabled },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  trustRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16, paddingBottom: 20 },
  trustText: { fontSize: 10, color: Colors.textHint, letterSpacing: 0.5, fontWeight: '500' },
});
