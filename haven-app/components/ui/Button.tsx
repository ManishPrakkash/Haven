import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';

type Variant = 'primary' | 'secondary' | 'outlined' | 'ghost' | 'danger';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({ label, onPress, variant = 'primary', loading, disabled, fullWidth, style }: ButtonProps) {
  const containerStyle = [
    styles.base,
    styles[variant as keyof typeof styles] || styles.primary,
    (disabled || loading) && styles.disabled,
    fullWidth && { width: '100%' },
    style,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.82}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : Colors.orange} size="small" />
      ) : (
        <Text style={[styles.label, styles[`${variant}Label` as keyof typeof styles]]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 12, height: 52, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  primary: { backgroundColor: Colors.orange },
  secondary: { backgroundColor: Colors.teal },
  outlined: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.orange },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: Colors.error },
  disabled: { opacity: 0.5 },
  label: { fontSize: 15, fontWeight: '600' },
  primaryLabel: { color: '#FFFFFF' },
  secondaryLabel: { color: '#FFFFFF' },
  outlinedLabel: { color: Colors.orange },
  ghostLabel: { color: Colors.textSecondary },
  dangerLabel: { color: '#FFFFFF' },
});
