import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./style";

function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.notFound}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back to Contact List</Link>
    </div>
  );
}

export default NotFound;
