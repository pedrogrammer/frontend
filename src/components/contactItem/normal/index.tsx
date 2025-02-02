import {
  EnvironmentOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useFrequentContacts } from "../../../core/hooks/useFrequentContacts";
import { lightTheme } from "../../../core/theme";
import { truncateString } from "../../../core/utils/truncateString";
import { useStyles } from "../style";

interface ContactItemProps {
  ref?: ((node: HTMLDivElement | null) => void) | null;
  id: number;
  avatarPic?: string;
  name: string;
  phone: string;
  city?: string;
  isRecentContact?: boolean;
  order?: number;
}

function ContactItem({
  ref,
  id,
  avatarPic,
  name,
  phone,
  city,
  isRecentContact,
  order,
}: ContactItemProps) {
  const classes = useStyles();

  const { addContactVisit } = useFrequentContacts();

  const avatarWrapper = (
    <div className={classes.avatarContainer}>
      {avatarPic ? (
        <LazyLoadImage
          src={avatarPic}
          alt="avatar"
          effect="blur" // Blur effect before the image loads
          width="100%"
          height={60}
        />
      ) : (
        <UserOutlined className={classes.avatarPlaceholderIcon} />
      )}
    </div>
  );

  return (
    <div
      ref={ref}
      className={classes.container}
      onClick={() =>
        addContactVisit({ id, name, phone, avatar: avatarPic, city })
      }
    >
      {isRecentContact ? (
        <Badge
          count={order}
          offset={[1, 8]}
          size="small"
          color={lightTheme.bg}
          style={{ color: lightTheme.text }}
        >
          {avatarWrapper}
        </Badge>
      ) : (
        avatarWrapper
      )}
      <div>
        <div style={{ marginBottom: 8 }}>{name}</div>
        <div
          className={classes.info}
          style={
            isRecentContact
              ? { display: "flex", flexDirection: "column" }
              : undefined
          }
        >
          <span>
            <PhoneOutlined style={{ marginRight: 4 }} />
            {phone.match(/.{1,3}/g)?.join(" ") || ""}
          </span>
          <span style={{ marginLeft: isRecentContact ? 0 : 10 }}>
            <EnvironmentOutlined style={{ marginRight: 4 }} />
            {city ? (isRecentContact ? truncateString(city) : city) : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ContactItem);
