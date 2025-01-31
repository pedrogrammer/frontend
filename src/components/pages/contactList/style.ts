import { createUseStyles } from "react-jss";
import { Theme } from "../../../core/theme";

export const useStyles = createUseStyles(({ lightText, primary }: Theme) => ({
  searchIcon: {
    color: lightText,
  },
  bulletIcon: {
    color: primary,
  },
}));
