import React from "react";
import {
  CompassOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useStyles } from "../style";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ContactItemProps {
  ref?: ((node: HTMLDivElement | null) => void) | null;
  avatarPic?: string;
  name: string;
  phone: string;
  city?: string;
}

function ContactItem({ ref, avatarPic, name, phone, city }: ContactItemProps) {
  const classes = useStyles();

  return (
    <div ref={ref} className={classes.container}>
      <div className={classes.avatarContainer}>
        {avatarPic ? (
          <LazyLoadImage
            src={avatarPic}
            alt="avatar"
            effect="blur" // Blur effect before the image loads
            width="100%"
          />
        ) : (
          <UserOutlined className={classes.avatarPlaceholderIcon} />
        )}
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>{name}</div>
        <div className={classes.info}>
          <span>
            <PhoneOutlined style={{ marginRight: 4 }} />
            {phone}
          </span>
          <span style={{ marginLeft: 10 }}>
            <CompassOutlined style={{ marginRight: 4 }} />
            {city ? city : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ContactItem);
