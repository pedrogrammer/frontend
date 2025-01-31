import { createUseStyles } from "react-jss";
import { Theme } from "../../core/theme";

export const useStyles = createUseStyles(
  ({ lightShade, bgShade, lightText }: Theme) => ({
    container: {
      display: "flex",
      gap: 10,
      padding: 10,
      borderRadius: 8,
      boxShadow: `${lightShade} 0px 1px 4px`,
    },
    avatarContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: bgShade,
      width: 60,
      height: 60,
      borderRadius: "50%",
      overflow: "hidden",
    },
    avatarPlaceholderIcon: {
      fontSize: 30,
      color: lightText,
    },
    info: {
      fontSize: 14,
      color: lightText,
    },
  }),
);
