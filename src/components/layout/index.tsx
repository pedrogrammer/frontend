import React from "react";
import { useStyles } from "./style";
import Header from "../header";
import AppRouter from "../../routes";

function Layout() {
  const classes = useStyles();

  return (
    <div className={classes.layoutContainer}>
      <div className={classes.layout}>
        <Header />
        <AppRouter />
      </div>
    </div>
  );
}

export default Layout;
