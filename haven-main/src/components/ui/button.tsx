import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  TouchableOpacityProps, 
  ViewStyle, 
  TextStyle, 
  ActivityIndicator,
  StyleProp
} from 'react-native';
import { BrandColors } from '@/constants/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  variant = 'primary', 
  loading = false, 
  leftIcon, 
  rightIcon, 
  style, 
  textStyle, 
  disabled,
  ...props 
}) => {
  const isOutline = variant === 'outline';
  const isSecondary = variant === 'secondary';
  const isText = variant === 'text';

  const containerStyles = [
    styles.container,
    isSecondary && styles.secondaryContainer,
    isOutline && styles.outlineContainer,
    isText && styles.textContainer,
    disabled && styles.disabledContainer,
    style
  ];

  const labelStyles = [
    styles.text,
    isOutline && styles.outlineText,
    isSecondary && styles.secondaryText,
    isText && styles.textVariantText,
    disabled && styles.disabledText,
    textStyle
  ];

  return (
    <TouchableOpacity 
      style={containerStyles} 
      activeOpacity={0.8} 
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={isOutline || isText ? BrandColors.accent : '#FFF'} />
      ) : (
        <>
          {leftIcon}
          <Text style={labelStyles}>{title}</Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BrandColors.accent,
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  secondaryContainer: {
    backgroundColor: BrandColors.secondary,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: BrandColors.accent,
  },
  textContainer: {
    backgroundColor: 'transparent',
    height: 'auto',
    paddingHorizontal: 0,
  },
  disabledContainer: {
    backgroundColor: '#E2E8F0',
    borderColor: '#E2E8F0',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  outlineText: {
    color: BrandColors.accent,
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  textVariantText: {
    color: BrandColors.accent,
    fontWeight: '600',
  },
  disabledText: {
    color: '#94A3B8',
  },
});
