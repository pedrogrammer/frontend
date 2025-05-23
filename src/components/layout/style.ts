import { Theme } from "../../core/theme";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles(
  ({ primary, secondary, shade, background }: Theme) => ({
    layoutContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: `linear-gradient(to right, ${primary}, ${secondary})`,
    },
    layout: {
      display: "flex",
      flexDirection: "column",
      width: 504,
      height: "90vh",
      backgroundColor: background,
      borderRadius: 20,
      boxShadow: `${shade} 0px 3px 8px`,
      overflow: "hidden",
    },
  }),
);
