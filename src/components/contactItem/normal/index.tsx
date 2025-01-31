import React from "react";
import { CompassOutlined, PhoneOutlined } from "@ant-design/icons";
import sampleAvatar from "../../../assets/sampleAvatar.png";
import { useStyles } from "../style";

function ContactItem() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.avatarContainer}>
        <img src={sampleAvatar} alt="Logo" style={{ width: "100%" }} />
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>Pedram Sheikhrahimi</div>
        <div className={classes.info}>
          <span>
            <PhoneOutlined style={{ marginRight: 4 }} />
            +989907735261
          </span>
          <span style={{ marginLeft: 10 }}>
            <CompassOutlined style={{ marginRight: 4 }} />
            Tehran
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContactItem;
