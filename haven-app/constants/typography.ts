import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const Typography = StyleSheet.create({
  displayLarge:  { fontSize: 32, fontWeight: '700', color: Colors.textPrimary },
  headingLarge:  { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  headingMedium: { fontSize: 20, fontWeight: '600', color: Colors.textPrimary },
  headingSmall:  { fontSize: 17, fontWeight: '600', color: Colors.textPrimary },
  bodyLarge:     { fontSize: 16, fontWeight: '400', color: Colors.textPrimary, lineHeight: 24 },
  bodyMedium:    { fontSize: 14, fontWeight: '400', color: Colors.textSecondary, lineHeight: 22 },
  bodySmall:     { fontSize: 13, fontWeight: '400', color: Colors.textSecondary, lineHeight: 20 },
  caption:       { fontSize: 11, fontWeight: '400', color: Colors.textHint },
  labelLarge:    { fontSize: 15, fontWeight: '600' },
  labelMedium:   { fontSize: 13, fontWeight: '500' },
  labelSmall:    { fontSize: 11, fontWeight: '500' },
});
