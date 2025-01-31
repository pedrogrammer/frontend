import React from "react";
import { useParams } from "react-router-dom";
import { useGetContact } from "../../../core/services/hooks";

function ContactDetails() {
  const { id } = useParams();

  const { data } = useGetContact({ id: id || "0" });

  return <div>{data?.first_name}</div>;
}

export default ContactDetails;
