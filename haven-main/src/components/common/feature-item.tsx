import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { BrandColors } from '@/constants/theme';

interface FeatureItemProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  style?: ViewStyle;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ 
  icon, 
  iconBg, 
  title, 
  subtitle, 
  style 
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
        {icon}
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: BrandColors.text.primary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: BrandColors.text.muted,
    fontWeight: '500',
  },
});
