import { createUseStyles } from "react-jss";
import { Theme } from "../../core/theme";

export const useStyles = createUseStyles(({ premier }: Theme) => ({
  recentContacts: {
    marginTop: 12,
    paddingInline: 12,
  },
  empty: {
    paddingBlock: "20px 12px",
    marginBlock: "0",
  },
  bulletIcon: {
    color: premier,
  },
  contactListContainer: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingInline: 2,
  },
}));
