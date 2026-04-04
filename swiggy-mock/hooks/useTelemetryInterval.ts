import { useEffect } from 'react';
import { useUserStore } from '../app/store/userStore';

export function useTelemetryInterval() {
  const { profile } = useUserStore();

  useEffect(() => {
    // Send telemetry to Haven Backend every 10 seconds
    const interval = setInterval(async () => {
      try {
        const { lat, lng, isDrifting, locationOffset } = profile.homeStats;
        
        // 10+ Year Dev Technique: Simulate 'Real-world Chaos'
        // Add manual offset + random 'Drift' jitter
        const drift = isDrifting ? (Math.random() - 0.5) * 0.0005 : 0;
        const finalLat = lat + locationOffset.lat + drift;
        const finalLng = lng + locationOffset.lng + drift;

        const payload = {
          workerId: profile.id,
          name: profile.name,
          platform: 'swiggy',
          lat: finalLat,
          lng: finalLng,
          isOnline: profile.homeStats.isOnline,
          timestamp: new Date().toISOString()
        };

        // Fire & forget to backend
        fetch('http://localhost:3000/telemetry/ping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {
          // Silent catch for mock environment if backend is down
        });
      } catch (error) {
        // Silently fail if completely unreachable
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [profile.id, profile.homeStats.lat, profile.homeStats.lng, profile.homeStats.isOnline]);
}
