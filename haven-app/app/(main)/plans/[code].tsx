import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { plansService } from '../../../services/mock.services';
import { useEnrollmentStore } from '../../../store/enrollment.store';
import { TRIGGER_DISPLAY } from '../../../constants/triggers';
import { formatCurrency } from '../../../utils/format';
import { Colors } from '../../../constants/colors';

export default function PlanDetailScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const [plan, setPlan] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  const { setPlan: selectPlan } = useEnrollmentStore();

  useEffect(() => {
    async function load() {
      const data = await plansService.getByCode(code);
      setPlan(data);
    }
    load();
  }, [code]);

  if (!plan) return null;

  const tabs = ['Overview', 'Coverage', 'Payouts', 'Terms'];

  const handleSelect = () => {
    selectPlan(plan.plan_code, plan.weekly_premium, plan.weekly_premium_gst, plan.payout_amounts);
    router.push('/(main)/plans/confirm');
  };

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>{plan.plan_name} Plan</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.tabRow}>
        {tabs.map((tab, i) => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === i && styles.tabActive]} onPress={() => setActiveTab(i)}>
            <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 0 && (
          <>
            <Text style={styles.sectionTitle}>Plan Summary</Text>
            <Text style={styles.desc}>{plan.features.shortDesc}</Text>
            <View style={styles.metricsGrid}>
              {[
                { label: 'Weekly Premium', value: formatCurrency(plan.weekly_premium_gst), icon: 'wallet' },
                { label: 'Coverage', value: formatCurrency(plan.coverage_amount), icon: 'shield' },
                { label: 'Max Payout/Day', value: formatCurrency(plan.max_payout_per_day), icon: 'trending-up' },
                { label: 'Claims/Week', value: `${plan.max_claims_per_week}`, icon: 'document-text' },
                { label: 'Waiting Period', value: `${plan.waiting_period_days}d`, icon: 'time' },
                { label: 'Payout Speed', value: `${plan.payout_sla_hours}h`, icon: 'flash' },
              ].map(m => (
                <View key={m.label} style={styles.metricItem}>
                  <Ionicons name={m.icon as any} size={18} color={Colors.teal} />
                  <Text style={styles.metricValue}>{m.value}</Text>
                  <Text style={styles.metricLabel}>{m.label}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {activeTab === 1 && (
          <>
            <Text style={styles.sectionTitle}>Triggers Covered</Text>
            {plan.triggers_covered.map((t: string) => {
              const display = TRIGGER_DISPLAY[t];
              return (
                <View key={t} style={styles.triggerRow}>
                  <View style={[styles.triggerIcon, { backgroundColor: `${display?.color}15` }]}>
                    <Ionicons name={display?.icon as any} size={18} color={display?.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.triggerLabel}>{display?.label}</Text>
                    <Text style={styles.triggerPayout}>Payout: {formatCurrency(plan.payout_amounts[t])}</Text>
                  </View>
                  <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                </View>
              );
            })}

            {Object.keys(TRIGGER_DISPLAY).filter(t => !plan.triggers_covered.includes(t)).map(t => {
              const display = TRIGGER_DISPLAY[t];
              return (
                <View key={t} style={[styles.triggerRow, { opacity: 0.4 }]}>
                  <View style={[styles.triggerIcon, { backgroundColor: '#F1F5F9' }]}>
                    <Ionicons name={display?.icon as any} size={18} color={Colors.textHint} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.triggerLabel}>{display?.label}</Text>
                    <Text style={styles.triggerPayout}>Not covered</Text>
                  </View>
                  <Ionicons name="close-circle" size={20} color={Colors.textHint} />
                </View>
              );
            })}
          </>
        )}

        {activeTab === 2 && (
          <>
            <Text style={styles.sectionTitle}>Payout Schedule</Text>
            {Object.entries(plan.payout_amounts).map(([trigger, amount]) => {
              const display = TRIGGER_DISPLAY[trigger];
              return (
                <View key={trigger} style={styles.payoutRow}>
                  <Text style={styles.payoutTrigger}>{display?.label}</Text>
                  <Text style={styles.payoutAmount}>{formatCurrency(amount as number)}</Text>
                </View>
              );
            })}
            <View style={styles.infoCard}>
              <Ionicons name="information-circle" size={18} color={Colors.info} />
              <Text style={styles.infoText}>Payouts are sent directly to your UPI account within {plan.payout_sla_hours} hours of claim approval.</Text>
            </View>
          </>
        )}

        {activeTab === 3 && (
          <>
            <Text style={styles.sectionTitle}>Terms & Conditions</Text>
            {[
              'Waiting period starts from the date of first premium payment.',
              `Maximum ${plan.max_claims_per_week} claims allowed per week.`,
              `Maximum payout of ${formatCurrency(plan.max_payout_per_day)} per day.`,
              'Claims are auto-detected based on verified trigger data.',
              'Policy can be cancelled anytime. No refund for current week.',
              'Premium is charged weekly. GST of 18% is applicable.',
            ].map((term, i) => (
              <View key={i} style={styles.termRow}>
                <Text style={styles.termBullet}>{i + 1}.</Text>
                <Text style={styles.termText}>{term}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerPrice}>{formatCurrency(plan.weekly_premium_gst)}</Text>
          <Text style={styles.footerInterval}>per week (incl. GST)</Text>
        </View>
        <TouchableOpacity style={styles.selectBtn} onPress={handleSelect} activeOpacity={0.85}>
          <Text style={styles.selectBtnText}>Select Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 12 },
  topTitle: { fontSize: 18, fontWeight: '600', color: Colors.textPrimary },
  tabRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 4, marginBottom: 8 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: Colors.navy },
  tabText: { fontSize: 12, fontWeight: '500', color: Colors.textSecondary },
  tabTextActive: { color: '#FFFFFF' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: Colors.textPrimary, marginBottom: 16 },
  desc: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22, marginBottom: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricItem: { width: '47%', backgroundColor: Colors.card, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: Colors.divider },
  metricValue: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, marginTop: 8 },
  metricLabel: { fontSize: 11, color: Colors.textHint, marginTop: 2 },
  triggerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  triggerIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  triggerLabel: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary },
  triggerPayout: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  payoutRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  payoutTrigger: { fontSize: 14, color: Colors.textPrimary },
  payoutAmount: { fontSize: 15, fontWeight: '600', color: Colors.success },
  infoCard: { flexDirection: 'row', gap: 10, backgroundColor: Colors.infoBg, padding: 14, borderRadius: 12, marginTop: 20 },
  infoText: { flex: 1, fontSize: 12, color: Colors.info, lineHeight: 18 },
  termRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  termBullet: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  termText: { flex: 1, fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', backgroundColor: Colors.card, padding: 20, paddingBottom: 32,
    borderTopWidth: 1, borderTopColor: Colors.divider,
  },
  footerPrice: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  footerInterval: { fontSize: 11, color: Colors.textHint },
  selectBtn: { backgroundColor: Colors.orange, borderRadius: 12, paddingHorizontal: 28, height: 48, alignItems: 'center', justifyContent: 'center' },
  selectBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
});
