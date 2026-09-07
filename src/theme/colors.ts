// Brand palette for the coffee shop app.
// Warm, roasted tones instead of the generic "app blue" -- meant to feel
// like a real neighborhood coffee shop, not a template.

export const colors = {
  espresso: '#2B1B14',   // near-black brown, used for primary text & headers
  roast: '#6F4630',      // mid brown, secondary text / icons
  cream: '#F2E9DC',      // main background, like unbleached paper
  creamLight: '#FAF6EF', // cards / elevated surfaces
  honey: '#C08A28',      // accent color -- buttons, highlights, price tags
  honeyDark: '#9C6E1C',  // pressed/hover state for honey
  sage: '#5B7A5B',       // success / rewards / "in progress" states
  sageLight: '#E7EEE3',
  error: '#B3492F',
  border: '#E3D6C2',
  white: '#FFFFFF',
};

export type ColorKey = keyof typeof colors;
