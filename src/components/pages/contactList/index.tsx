import React from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";

function ContactList() {
  return (
    <>
      <Input />
      <Link to={`/contact/1`}>Contact #1</Link>
    </>
  );
}

export default ContactList;
