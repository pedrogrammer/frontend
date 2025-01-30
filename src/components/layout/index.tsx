import React from "react";
import { useStyles } from "./style";
import Header from "../header";

function Layout() {
  const classes = useStyles();

  return (
    <div className={classes.layoutContainer}>
      <div className={classes.layout}>
        <Header />
      </div>
    </div>
  );
}

export default Layout;
