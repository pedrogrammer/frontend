import { createUseStyles } from "react-jss";
import { Theme } from "../../../core/theme";

export const useStyles = createUseStyles(({ lightText, primary }: Theme) => ({
  searchIcon: {
    color: lightText,
  },
  bulletIcon: {
    color: primary,
  },
  allContacts: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 200,
  },
  contactListContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: 10,
    paddingTop: 5,
    paddingInline: 2,
    overflowY: "scroll",
  },
}));
