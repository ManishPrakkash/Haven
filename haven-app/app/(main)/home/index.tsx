import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { policyService, claimsService, triggersService } from '../../../services/mock.services';
import { useAuthStore } from '../../../store/auth.store';
import { TRIGGER_DISPLAY } from '../../../constants/triggers';
import { formatCurrency, formatDate, daysRemaining } from '../../../utils/format';
import { Colors } from '../../../constants/colors';
import { Skeleton } from '../../../components/ui/Skeleton';

export default function HomeDashboard() {
  const { userId } = useAuthStore();
  const [policy, setPolicy] = useState<any>(null);
  const [activeTriggers, setActiveTriggers] = useState<any[]>([]);
  const [recentClaims, setRecentClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAll = useCallback(async () => {
    try {
      const [policyData, triggersData, claimsData] = await Promise.all([
        policyService.getMyPolicy(),
        triggersService.getActiveTriggers('CHE'),
        claimsService.getMyClaims({ limit: 3 }),
      ]);
      setPolicy(policyData);
      setActiveTriggers(triggersData ?? []);
      setRecentClaims(claimsData ?? []);
    } catch {
      // First time user with no policy
      setPolicy(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const onRefresh = () => { setRefreshing(true); loadAll(); };

  if (loading) {
    return (
      <View style={styles.root}>
        <View style={{ padding: 24, gap: 16 }}>
          <Skeleton style={{ width: '100%', height: 180 }} borderRadius={16} />
          <Skeleton style={{ width: '100%', height: 60 }} borderRadius={12} />
          <Skeleton style={{ width: '100%', height: 100 }} borderRadius={12} />
        </View>
      </View>
    );
  }

  if (!policy) {
    return (
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.noPolicyContainer}>
          <View style={styles.noPolicyIcon}>
            <Ionicons name="shield-outline" size={48} color={Colors.teal} />
          </View>
          <Text style={styles.noPolicyTitle}>No Active Policy</Text>
          <Text style={styles.noPolicyDesc}>Choose a plan and get protected in minutes</Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={() => router.push('/(main)/plans')} activeOpacity={0.85}>
            <Text style={styles.ctaBtnText}>View Plans</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  const isWaiting = policy.status === 'WAITING';
  const daysLeft = daysRemaining(policy.waitingPeriodEndDate);

  return (
    <View style={styles.root}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.teal} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <LinearGradient colors={[Colors.navy, Colors.teal]} style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroGreeting}>Hi, Welcome back 👋</Text>
              <Text style={styles.heroPolicyNum}>{policy.policyNumber}</Text>
            </View>
            <View style={[styles.statusBadge, isWaiting ? styles.statusWaiting : styles.statusActive]}>
              <Text style={styles.statusText}>{policy.status}</Text>
            </View>
          </View>
          <View style={styles.heroDivider} />
          <View style={styles.heroBottom}>
            <View>
              <Text style={styles.heroLabel}>Coverage Amount</Text>
              <Text style={styles.heroCoverage}>{formatCurrency(policy.coverageAmount)}</Text>
            </View>
            <View style={styles.heroRight}>
              <Text style={styles.heroLabel}>Plan</Text>
              <Text style={styles.heroPlan}>{policy.planName}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Waiting Period Bar */}
          {isWaiting && (
            <View style={styles.waitingCard}>
              <View style={styles.waitingHeader}>
                <Ionicons name="time" size={18} color={Colors.warning} />
                <Text style={styles.waitingTitle}>Waiting Period</Text>
                <Text style={styles.waitingDays}>{daysLeft} days left</Text>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${Math.max(10, (1 - daysLeft / 7) * 100)}%` }]} />
              </View>
              <Text style={styles.waitingNote}>Coverage starts on {formatDate(policy.waitingPeriodEndDate)}</Text>
            </View>
          )}

          {/* Trigger Alerts */}
          {activeTriggers.map(trigger => {
            const display = TRIGGER_DISPLAY[trigger.type];
            return (
              <View key={trigger.id} style={styles.triggerCard}>
                <Ionicons name={display?.icon as any || 'alert'} size={22} color={display?.color || Colors.warning} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.triggerTitle}>{display?.label} detected in {trigger.city}</Text>
                  <Text style={styles.triggerSub}>
                    {isWaiting ? 'Coverage not yet active' : 'Auto-claim will be processed'}
                  </Text>
                </View>
              </View>
            );
          })}

          {/* Weekly Summary */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Ionicons name="document-text" size={20} color={Colors.teal} />
              <Text style={styles.summaryValue}>{policy.totalClaimsPaid}</Text>
              <Text style={styles.summaryLabel}>Claims Paid</Text>
            </View>
            <View style={styles.summaryCard}>
              <Ionicons name="cash" size={20} color={Colors.success} />
              <Text style={styles.summaryValue}>{formatCurrency(policy.totalPayoutAmount)}</Text>
              <Text style={styles.summaryLabel}>Total Received</Text>
            </View>
          </View>

          {/* Recent Claims */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => router.push('/(main)/claims')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentClaims.length === 0 ? (
            <View style={styles.emptyActivity}>
              <Text style={styles.emptyText}>No claims yet. Claims appear here automatically.</Text>
            </View>
          ) : (
            recentClaims.map(claim => {
              const display = TRIGGER_DISPLAY[claim.triggerType];
              return (
                <TouchableOpacity
                  key={claim.id}
                  style={styles.claimRow}
                  onPress={() => router.push(`/(main)/claims/${claim.id}`)}
                >
                  <View style={[styles.claimIcon, { backgroundColor: `${display?.color || Colors.teal}15` }]}>
                    <Ionicons name={display?.icon as any || 'flash'} size={18} color={display?.color || Colors.teal} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.claimTitle}>{display?.label}</Text>
                    <Text style={styles.claimDate}>{formatDate(claim.createdAt)}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.claimAmount}>{formatCurrency(claim.amount)}</Text>
                    <View style={[styles.claimStatus, claim.status === 'PAID' ? styles.statusPaid : claim.status === 'APPROVED' ? styles.statusApproved : styles.statusPending]}>
                      <Text style={styles.claimStatusText}>{claim.status}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  heroCard: { margin: 16, borderRadius: 20, padding: 24 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  heroGreeting: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  heroPolicyNum: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4, letterSpacing: 0.5 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusActive: { backgroundColor: 'rgba(22,163,74,0.2)' },
  statusWaiting: { backgroundColor: 'rgba(217,119,6,0.2)' },
  statusText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.5 },
  heroDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 16 },
  heroBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  heroLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.5 },
  heroCoverage: { fontSize: 28, fontWeight: '700', color: '#FFFFFF', marginTop: 4 },
  heroRight: { alignItems: 'flex-end' },
  heroPlan: { fontSize: 18, fontWeight: '600', color: '#FFFFFF', marginTop: 4 },
  content: { paddingHorizontal: 16 },
  waitingCard: { backgroundColor: Colors.warningBg, padding: 16, borderRadius: 14, marginBottom: 16 },
  waitingHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  waitingTitle: { flex: 1, fontSize: 14, fontWeight: '600', color: Colors.warning },
  waitingDays: { fontSize: 13, fontWeight: '600', color: Colors.warning },
  progressBg: { height: 6, backgroundColor: 'rgba(217,119,6,0.2)', borderRadius: 3, marginTop: 12 },
  progressFill: { height: 6, backgroundColor: Colors.warning, borderRadius: 3 },
  waitingNote: { fontSize: 12, color: Colors.warning, marginTop: 8 },
  triggerCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FFF7ED',
    padding: 16, borderRadius: 14, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: Colors.orange,
  },
  triggerTitle: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  triggerSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  summaryCard: {
    flex: 1, backgroundColor: Colors.card, borderRadius: 14, padding: 16, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.divider,
  },
  summaryValue: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary, marginTop: 8 },
  summaryLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 4 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  seeAll: { fontSize: 13, color: Colors.teal, fontWeight: '500' },
  emptyActivity: { backgroundColor: '#F8FAFC', padding: 24, borderRadius: 14, alignItems: 'center', marginBottom: 20 },
  emptyText: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center' },
  claimRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.card,
    padding: 16, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: Colors.divider,
  },
  claimIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  claimTitle: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary },
  claimDate: { fontSize: 11, color: Colors.textHint, marginTop: 2 },
  claimAmount: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  claimStatus: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 4 },
  statusPaid: { backgroundColor: Colors.successBg },
  statusApproved: { backgroundColor: Colors.infoBg },
  statusPending: { backgroundColor: Colors.warningBg },
  claimStatusText: { fontSize: 10, fontWeight: '600', color: Colors.textSecondary },
  noPolicyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  noPolicyIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: `${Colors.teal}15`, alignItems: 'center', justifyContent: 'center' },
  noPolicyTitle: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginTop: 20 },
  noPolicyDesc: { fontSize: 14, color: Colors.textSecondary, marginTop: 8, textAlign: 'center' },
  ctaBtn: {
    backgroundColor: Colors.orange, borderRadius: 12, height: 52, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 32, marginTop: 28,
  },
  ctaBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
