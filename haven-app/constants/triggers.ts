export const TRIGGER_DISPLAY: Record<string, {
  label: string; icon: string; color: string; shortLabel: string;
}> = {
  RAIN_EXTREME:      { label: 'Heavy Rainfall',    icon: 'rainy',    color: '#1565C0', shortLabel: 'Rain'    },
  AQI_SEVERE:        { label: 'Poor Air Quality',  icon: 'cloud',    color: '#5D4037', shortLabel: 'AQI'     },
  HEAT_EXTREME:      { label: 'Heat Wave',         icon: 'sunny',    color: '#BF360C', shortLabel: 'Heat'    },
  PLATFORM_OUTAGE:   { label: 'App Outage',        icon: 'phone-portrait',    color: '#E23744', shortLabel: 'Outage'  },
  SOCIAL_DISRUPTION: { label: 'Curfew / Strike',   icon: 'warning',  color: '#F57C00', shortLabel: 'Curfew'  },
};
