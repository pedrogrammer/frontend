import React from "react";
import { XFilled } from "@ant-design/icons";
import { ContactItem } from "../contactItem";
import { Empty } from "antd";
import { useStyles } from "./style";

function RecentContacts() {
  const classes = useStyles();

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ paddingBottom: 10 }}>
        <XFilled className={classes.bulletIcon} />
        <label style={{ marginLeft: 8 }}>Recent Contacts</label>
      </div>
      {true ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description=""
          className={classes.empty}
        />
      ) : (
        <ContactItem />
      )}
    </div>
  );
}

export default React.memo(RecentContacts);
