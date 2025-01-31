import React from "react";
import { XFilled } from "@ant-design/icons";
import { ContactItem } from "../contactItem";

function RecentContacts() {
  return (
    <div style={{ marginTop: 12 }}>
      <div>
        <XFilled style={{ color: "gold" }} />
        <label style={{ marginLeft: 8 }}>Recent Contacts</label>
      </div>
      <ContactItem />
    </div>
  );
}

export default RecentContacts;
