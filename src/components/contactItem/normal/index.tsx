import React from "react";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useStyles } from "../style";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useFrequentContacts } from "../../../core/hooks/useFrequentContacts";

interface ContactItemProps {
  ref?: ((node: HTMLDivElement | null) => void) | null;
  id: number;
  avatarPic?: string;
  name: string;
  phone: string;
  city?: string;
}

function ContactItem({
  ref,
  id,
  avatarPic,
  name,
  phone,
  city,
}: ContactItemProps) {
  const classes = useStyles();

  const { addContactVisit } = useFrequentContacts();

  return (
    <div
      ref={ref}
      className={classes.container}
      onClick={() =>
        addContactVisit({ id, name, phone, avatar: avatarPic, city })
      }
    >
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
            {phone.match(/.{1,3}/g)?.join(" ") || ""}
          </span>
          <span style={{ marginLeft: 10 }}>
            <EnvironmentOutlined style={{ marginRight: 4 }} />
            {city ? city : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ContactItem);
