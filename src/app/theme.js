import { pxToRem } from 'utils/style';

/**
 * Transform theme token objects into CSS custom properties
 */
export function createThemeProperties(theme) {
  return Object.keys(theme)
    .map(key => `--${key}: ${theme[key]};`)
    .join('\n');
}

// Full list of tokens
const baseTokens = {
  rgbBlack: '0 0 0',
  rgbWhite: '255 255 255',
  rgbAccent: '248 69 37',
  rgbBackground: '255 255 255',
  rgbBackgroundSecondary: '249 249 249',
  rgbBackgroundDark: '31 30 29',
  rgbBackgroundDarkSecondary: '23 22 21',
  rgbText: '17 17 17',
  colorTextTitle: 'rgb(var(--rgbText) / 1)',
  colorTextBody: 'rgb(var(--rgbText) / 0.8)',
  colorTextLight: 'rgb(var(--rgbText) / 0.6)',
  ease1: 'cubic-bezier(0.475, 0.425, 0, 0.995)',
  ease2: 'cubic-bezier(0.835, -0.005, 0.06, 1)',
  durationXS: '200ms',
  durationS: '300ms',
  durationM: '400ms',
  durationL: '600ms',
  durationXL: '800ms',
  fontStack:
    'Montserrat, Helvetica Neue, Helvetica, Arial, sans-serif',
  monoFontStack:
    'SFMono Regular, Roboto Mono, Consolas, Liberation Mono, Menlo, Courier, monospace',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  fontSizeH1: pxToRem(72),
  fontSizeH2: pxToRem(54),
  fontSizeH3: pxToRem(16),
  fontSizeH4: pxToRem(14),
  fontSizeBody: pxToRem(20),
  letterSpacingH1: '-0.01em',
  letterSpacingH2: '0em',
  letterSpacingH3: '0.8em',
  letterSpacingH4: '0.16em',
  letterSpacingBody: '0.03em',
  lineHeightTitle: '1.2',
  lineHeightBody: '1.8',
  lineHeightLabel: '2',
  maxWidthS: '100%',
  maxWidthM: '960px',
  maxWidthL: '1080px',
  maxWidthXL: '1280px',
  spaceOuter: '64px',
  spaceXS: '4px',
  spaceS: '8px',
  spaceM: '16px',
  spaceL: '24px',
  spaceXL: '32px',
  space2XL: '48px',
  space3XL: '64px',
  space4XL: '96px',
  space5XL: '128px',
  space6XL: '152px',
  space7XL: '180px',
  space8XL: '200px',
  space9XL: '240px',
};

// Tokens that change based on viewport size
const tokensLaptop = {
  fontSizeH2: pxToRem(36),
};

const tokensTablet = {
  spaceOuter: '48px',
};

const tokensMobile = {
  spaceOuter: '24px',
  fontSizeH1: pxToRem(38),
  fontSizeH2: pxToRem(28),
  fontSizeH3: pxToRem(14),
  fontSizeBody: pxToRem(16),
};

export const tokens = {
  base: baseTokens,
  laptop: tokensLaptop,
  tablet: tokensTablet,
  mobile: tokensMobile,
};
