import { Theme } from "../../core/theme";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles(({ text }: Theme) => ({
  header: {
    display: "flex",
    padding: 12,
    paddingBottom: 0,
  },
  logo: {
    width: 80,
  },
  appTitle: {
    fontWeight: "bold",
    fontStyle: "italic",
    color: text,
  },
}));
