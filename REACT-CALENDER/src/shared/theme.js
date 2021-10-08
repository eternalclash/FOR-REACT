const device = {
  tablet: `@media screen and (min-width: 768px)`,
  desktop: `@media screen and (min-width: 1024px)`,
};

const colors = {
  white: "#F5F5F5",
  black: "#202020",
  lightGray: "#E0E0E0",
  red: "#eb2f06",
  blue: "#0652DD",
  lightBlue: '#ACF3FF',
};

const label = {
  brick: "#c8553d",
  darkRed: "#9A031E",
  darkYellow: "#FB8B24",
  darkOrange: "#E36414",
  persianGreen: "#2A9D8F",
  green: "#008000",
  eagleGreen: "#0F4C5C",
  // midNightBlue: "#145DA0",
  rose: "#B56576",
  violet: "#6D597A",
  // purple: "#5F0F40",
};

const borders = {
  basicBorder: `1px solid ${colors.red}`,
};

const fontSizes = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "20px",
  xl: "24px",
};

const theme = {
  device,
  colors,
  label,
  borders,
  fontSizes,
};

export default theme;
