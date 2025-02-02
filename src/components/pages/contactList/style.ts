import { createUseStyles } from "react-jss";
import { Theme } from "../../../core/theme";

export const useStyles = createUseStyles(
  ({ lightText, primary, danger }: Theme) => ({
    searchIcon: {
      color: lightText,
    },
    bulletIcon: {
      color: primary,
    },
    allContacts: {
      marginTop: 12,
      padding: 12,
      paddingTop: 0,
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
    listError: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      alignItems: "center",
      paddingTop: 20,
    },
    listErrorIcon: {
      color: danger,
      fontSize: 50,
    },
  }),
);
