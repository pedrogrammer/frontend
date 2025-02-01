interface Theme {
  primary: string;
  secondary: string;
  danger: string;
  shade: string;
  lightShade: string;
  glassShade: string;
  glassBg: string;
  bgShade: string;
  bg: string;
  text: string;
  lightText: string;
  premier: string;
  link: string;
  dark: string;
  transparent: string;
}

const lightTheme: Theme = {
  primary: "#11998e",
  secondary: "#38ef7d",
  danger: "#EC1C24",
  shade: "#0000003d",
  lightShade: "#00000029",
  glassShade: "#0000001a",
  glassBg: "#ffffff0d",
  bgShade: "#F0F0F0",
  bg: "#DEDEDE",
  text: "#373C42",
  lightText: "#8B9099",
  premier: "#ffd700",
  link: "#5E8ED9",
  dark: "#000000",
  transparent: "#00000000",
};

export { lightTheme };
export type { Theme };
