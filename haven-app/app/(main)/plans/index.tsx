import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { plansService } from '../../../services/mock.services';
import { useEnrollmentStore } from '../../../store/enrollment.store';
import { formatCurrency } from '../../../utils/format';
import { Colors } from '../../../constants/colors';
import { Skeleton } from '../../../components/ui/Skeleton';

const PLAN_COLORS: Record<string, { accent: string; bg: string }> = {
  LITE: { accent: Colors.liteAccent, bg: '#F8FAFC' },
  ECONOMY: { accent: Colors.economyAccent, bg: '#F0FDFA' },
  PRO: { accent: Colors.proAccent, bg: '#EFF6FF' },
};

export default function PlansScreen() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { setPlan } = useEnrollmentStore();

  useEffect(() => {
    async function load() {
      const data = await plansService.getAll();
      setPlans(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSelect = (plan: any) => {
    setPlan(plan.plan_code, plan.weekly_premium, plan.weekly_premium_gst, plan.payout_amounts);
    router.push('/(main)/plans/confirm');
  };

  if (loading) {
    return (
      <View style={styles.root}>
        <View style={{ padding: 20, gap: 16 }}>
          <Skeleton style={{ width: '100%', height: 200 }} borderRadius={16} />
          <Skeleton style={{ width: '100%', height: 200 }} borderRadius={16} />
          <Skeleton style={{ width: '100%', height: 200 }} borderRadius={16} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Choose Your Plan</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>Select the protection level that matches your needs</Text>

        {plans.map(plan => {
          const colors = PLAN_COLORS[plan.plan_code] || PLAN_COLORS.ECONOMY;
          const isRecommended = plan.features.badge === 'Recommended';

          return (
            <View key={plan.id} style={[styles.planCard, { borderColor: isRecommended ? Colors.teal : Colors.divider }]}>
              {plan.features.badge && (
                <View style={[styles.badge, { backgroundColor: isRecommended ? Colors.teal : Colors.navy }]}>
                  <Text style={styles.badgeText}>{plan.features.badge}</Text>
                </View>
              )}

              <View style={[styles.planHeader, { backgroundColor: colors.bg }]}>
                <Text style={[styles.planName, { color: colors.accent }]}>{plan.plan_name}</Text>
                <View style={styles.priceRow}>
                  <Text style={[styles.price, { color: colors.accent }]}>{formatCurrency(plan.weekly_premium)}</Text>
                  <Text style={styles.interval}>/week</Text>
                </View>
                <Text style={styles.gstNote}>({formatCurrency(plan.weekly_premium_gst)} incl. GST)</Text>
              </View>

              <View style={styles.planBody}>
                <Text style={styles.shortDesc}>{plan.features.shortDesc}</Text>

                <View style={styles.statsRow}>
                  <View style={styles.stat}>
                    <Ionicons name="shield" size={14} color={colors.accent} />
                    <Text style={styles.statText}>{formatCurrency(plan.coverage_amount)}</Text>
                  </View>
                  <View style={styles.stat}>
                    <Ionicons name="flash" size={14} color={colors.accent} />
                    <Text style={styles.statText}>{plan.triggers_covered.length} triggers</Text>
                  </View>
                  <View style={styles.stat}>
                    <Ionicons name="time" size={14} color={colors.accent} />
                    <Text style={styles.statText}>{plan.payout_sla_hours}h payout</Text>
                  </View>
                </View>

                <View style={styles.featuresList}>
                  {[plan.features.waitingLabel, plan.features.payoutLabel, plan.features.claimsLabel].map((f, i) => (
                    <View key={i} style={styles.featureItem}>
                      <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                      <Text style={styles.featureText}>{f}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.btnRow}>
                  <TouchableOpacity
                    style={styles.viewBtn}
                    onPress={() => router.push(`/(main)/plans/${plan.plan_code}`)}
                  >
                    <Text style={[styles.viewBtnText, { color: colors.accent }]}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.selectBtn, { backgroundColor: colors.accent }]}
                    onPress={() => handleSelect(plan)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.selectBtnText}>Select {plan.plan_name}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 12 },
  topTitle: { fontSize: 18, fontWeight: '600', color: Colors.textPrimary },
  scrollContent: { padding: 20, paddingTop: 4, paddingBottom: 40 },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: 20 },
  planCard: { borderRadius: 16, borderWidth: 1.5, overflow: 'hidden', marginBottom: 20, backgroundColor: Colors.card },
  badge: { position: 'absolute', top: 12, right: 12, zIndex: 1, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.5 },
  planHeader: { padding: 20, paddingBottom: 16 },
  planName: { fontSize: 22, fontWeight: '700' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 4 },
  price: { fontSize: 28, fontWeight: '700' },
  interval: { fontSize: 14, color: Colors.textSecondary, marginLeft: 4 },
  gstNote: { fontSize: 11, color: Colors.textHint, marginTop: 2 },
  planBody: { padding: 20, paddingTop: 16 },
  shortDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
  statsRow: { flexDirection: 'row', gap: 16, marginTop: 16 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: 12, fontWeight: '500', color: Colors.textPrimary },
  featuresList: { marginTop: 16, gap: 8 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureText: { fontSize: 13, color: Colors.textSecondary },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  viewBtn: { flex: 1, borderRadius: 10, height: 44, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border },
  viewBtnText: { fontSize: 13, fontWeight: '600' },
  selectBtn: { flex: 1.5, borderRadius: 10, height: 44, alignItems: 'center', justifyContent: 'center' },
  selectBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },
});
