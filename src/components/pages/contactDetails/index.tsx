import React from "react";
import { useParams } from "react-router-dom";

function ContactDetails() {
  const { id } = useParams();

  return <div>{id}</div>;
}

export default ContactDetails;
