import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./style";
import { useTranslation } from "react-i18next";

function NotFound() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.notFound}>
      <h1>{t("404")}</h1>
      <p>{t("pageDoesNotExist")}</p>
      <Link to="/">
        <button style={{ cursor: "pointer" }}>{t("goBack")}</button>
      </Link>
    </div>
  );
}

export default NotFound;
