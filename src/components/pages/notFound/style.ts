import { createUseStyles } from "react-jss";
import { Theme } from "../../../core/theme";

export const useStyles = createUseStyles(({ text }: Theme) => ({
  notFound: {
    textAlign: "center",
    padding: "50px",
    color: text,
  },
}));
