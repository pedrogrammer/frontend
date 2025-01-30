import React from "react";
import logo from "../../assets/logo.png";
import { useStyles } from "./style";

function Header() {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <img src={logo} alt="Logo" className={classes.logo} />
      <p className={classes.appTitle}>Contacts</p>
    </header>
  );
}

export default Header;
