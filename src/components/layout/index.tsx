import React from "react";
import { useStyles } from "./style";
import Header from "../header";
import AppRouter from "../../routes";
import { ToastContainer } from "react-toastify";

function Layout() {
  const classes = useStyles();

  return (
    <div className={classes.layoutContainer}>
      <div className={classes.layout}>
        <Header />
        <AppRouter />
      </div>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default Layout;
