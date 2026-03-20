import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEnrollmentStore } from '../../../store/enrollment.store';
import { formatCurrency } from '../../../utils/format';
import { Colors } from '../../../constants/colors';

export default function PlanConfirmScreen() {
  const { selectedPlanCode, calculatedPremium, premiumWithGst } = useEnrollmentStore();

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Confirm Selection</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <View style={styles.planBadge}>
            <Ionicons name="shield-checkmark" size={20} color={Colors.teal} />
            <Text style={styles.planName}>{selectedPlanCode} Plan</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.lineItem}>
            <Text style={styles.lineLabel}>Weekly Premium</Text>
            <Text style={styles.lineValue}>{formatCurrency(calculatedPremium || 0)}</Text>
          </View>
          <View style={styles.lineItem}>
            <Text style={styles.lineLabel}>GST (18%)</Text>
            <Text style={styles.lineValue}>{formatCurrency((premiumWithGst || 0) - (calculatedPremium || 0))}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.lineItem}>
            <Text style={styles.totalLabel}>Total Weekly</Text>
            <Text style={styles.totalValue}>{formatCurrency(premiumWithGst || 0)}</Text>
          </View>
        </View>

        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>What's Next?</Text>
          {[
            { step: 1, title: 'Legal Agreement', desc: 'Review and accept terms', icon: 'document-text' },
            { step: 2, title: 'Identity Verification', desc: 'Quick selfie & liveness check', icon: 'camera' },
            { step: 3, title: 'Digital Signature', desc: 'Sign your agreement', icon: 'pencil' },
            { step: 4, title: 'Payment', desc: 'Pay via UPI', icon: 'card' },
          ].map(s => (
            <View key={s.step} style={styles.stepRow}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNum}>{s.step}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.stepTitle}>{s.title}</Text>
                <Text style={styles.stepDesc}>{s.desc}</Text>
              </View>
              <Ionicons name={s.icon as any} size={18} color={Colors.textHint} />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={() => router.push('/(main)/enrollment/agreement')}
          activeOpacity={0.85}
        >
          <Text style={styles.proceedText}>Proceed to Agreement</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 12 },
  topTitle: { fontSize: 18, fontWeight: '600', color: Colors.textPrimary },
  content: { padding: 20, paddingBottom: 100 },
  summaryCard: { backgroundColor: Colors.card, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: Colors.divider },
  planBadge: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  planName: { fontSize: 18, fontWeight: '600', color: Colors.textPrimary },
  divider: { height: 1, backgroundColor: Colors.divider, marginVertical: 16 },
  lineItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  lineLabel: { fontSize: 14, color: Colors.textSecondary },
  lineValue: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary },
  totalLabel: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  totalValue: { fontSize: 18, fontWeight: '700', color: Colors.teal },
  stepsCard: { backgroundColor: Colors.card, borderRadius: 16, padding: 20, marginTop: 16, borderWidth: 1, borderColor: Colors.divider },
  stepsTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 16 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  stepCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.teal, alignItems: 'center', justifyContent: 'center' },
  stepNum: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  stepTitle: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary },
  stepDesc: { fontSize: 12, color: Colors.textSecondary, marginTop: 1 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.card, padding: 20, paddingBottom: 32, borderTopWidth: 1, borderTopColor: Colors.divider },
  proceedBtn: { backgroundColor: Colors.orange, borderRadius: 12, height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  proceedText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
