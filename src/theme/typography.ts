// Typography scale. Two font families: a warm serif for headings (the
// "personality" of the brand) and a clean sans for body text (readable at
// small sizes on a phone screen).
//
// Fonts are loaded in App.tsx via expo-font / @expo-google-fonts.

export const fonts = {
  heading: 'Fraunces_600SemiBold',
  headingBold: 'Fraunces_700Bold',
  body: 'WorkSans_400Regular',
  bodyMedium: 'WorkSans_500Medium',
  bodySemiBold: 'WorkSans_600SemiBold',
};

export const type = {
  h1: { fontFamily: fonts.headingBold, fontSize: 32, lineHeight: 38 },
  h2: { fontFamily: fonts.heading, fontSize: 24, lineHeight: 30 },
  h3: { fontFamily: fonts.heading, fontSize: 19, lineHeight: 24 },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22 },
  bodyMedium: { fontFamily: fonts.bodyMedium, fontSize: 15, lineHeight: 22 },
  label: { fontFamily: fonts.bodySemiBold, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: fonts.body, fontSize: 12, lineHeight: 16 },
};
