import React from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { SearchOutlined, XFilled } from "@ant-design/icons";
import RecentContacts from "../../recentContacts";
import { ContactItem, SkeletonContactItem } from "../../contactItem";
import { useStyles } from "./style";

function ContactList() {
  const classes = useStyles();

  return (
    <>
      <Input
        placeholder="Search in Snapp! Contacts"
        variant="filled"
        size="large"
        suffix={<SearchOutlined className={classes.searchIcon} />}
      />
      <RecentContacts />
      <div style={{ marginTop: 12 }}>
        <div>
          <XFilled className={classes.bulletIcon} />
          <label style={{ marginLeft: 8 }}>All Contacts</label>
        </div>
        <ContactItem />
        <SkeletonContactItem />
      </div>
      {/* <Link to={`/contact/1`}>Contact #1</Link> */}
    </>
  );
}

export default ContactList;
