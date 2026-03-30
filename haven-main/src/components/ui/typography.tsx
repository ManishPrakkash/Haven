import { Text, TextProps, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { BrandColors } from '@/constants/theme';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySemiBold' | 'caption' | 'link';
  color?: string;
  align?: 'left' | 'center' | 'right';
  style?: StyleProp<TextStyle>;
}

export const Typography: React.FC<TypographyProps> = ({ 
  variant = 'body', 
  color, 
  align = 'left', 
  style, 
  children, 
  ...props 
}) => {
  const variantStyles = styles[variant] || styles.body;
  
  const combinedStyles = [
    variantStyles,
    { textAlign: align },
    color ? { color } : null,
    style,
  ];

  return (
    <Text style={combinedStyles} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: '800',
    color: BrandColors.text.primary,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 26,
    fontWeight: '800',
    color: BrandColors.text.primary,
    marginBottom: 8,
  },
  h3: {
    fontSize: 20,
    fontWeight: '700',
    color: BrandColors.text.primary,
  },
  h4: {
    fontSize: 16,
    fontWeight: '700',
    color: BrandColors.text.primary,
  },
  body: {
    fontSize: 15,
    color: BrandColors.text.secondary,
    lineHeight: 23,
    fontWeight: '400',
  },
  bodySemiBold: {
    fontSize: 15,
    color: BrandColors.text.primary,
    fontWeight: '600',
    lineHeight: 23,
  },
  caption: {
    fontSize: 13,
    color: BrandColors.text.muted,
    fontWeight: '500',
  },
  link: {
    fontSize: 14,
    color: BrandColors.accent,
    fontWeight: '700',
  },
});
