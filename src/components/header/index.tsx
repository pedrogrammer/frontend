import React from "react";
import logo from "../../assets/logo.png";
import { useStyles } from "./style";
import { useTranslation } from "react-i18next";

function Header() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <header className={classes.header}>
      <img src={logo} alt="Logo" className={classes.logo} />
      <p className={classes.appTitle}>{t("contacts")}</p>
    </header>
  );
}

export default Header;
