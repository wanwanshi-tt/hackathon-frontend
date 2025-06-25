import {
  createTheme,
  DEFAULT_THEME,
  mergeMantineTheme,
  rem,
} from '@mantine/core';
import {
  primaryPalette,
  secondaryPalette,
  highlightPalette,
  neutralPalette,
} from './theme-colours';

const themeOverride = createTheme({
  primaryColor: 'primary',
  primaryShade: { dark: 7, light: 7 },
  colors: {
    primary: primaryPalette,
    secondary: secondaryPalette,
    highlight: highlightPalette,
    neutral: neutralPalette,
  },
  fontFamily: 'Roboto, sans-serif',
  fontSizes: {
    xxs: rem(10),
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
    xxl: rem(24),
    xxxl: rem(28),
    huge: rem(32),
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
