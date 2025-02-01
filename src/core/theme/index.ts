interface Theme {
  primary: string;
  secondary: string;
  danger: string;
  shade: string;
  lightShade: string;
  bgShade: string;
  text: string;
  lightText: string;
  premier: string;
}

const lightTheme: Theme = {
  primary: "#11998e",
  secondary: "#38ef7d",
  danger: "#EC1C24",
  shade: "#0000003d",
  lightShade: "#00000029",
  bgShade: "#F0F0F0",
  text: "#373C42",
  lightText: "#8B9099",
  premier: "#ffd700",
};

export { lightTheme };
export type { Theme };
