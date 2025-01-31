interface Theme {
  primary: string;
  secondary: string;
  shade: string;
  lightShade: string;
  bgShade: string;
  text: string;
  lightText: string;
}

const lightTheme: Theme = {
  primary: "#11998e",
  secondary: "#38ef7d",
  shade: "#0000003d",
  lightShade: "#00000029",
  bgShade: "#F0F0F0",
  text: "#373C42",
  lightText: "#8B9099",
};

export { lightTheme };
export type { Theme };
