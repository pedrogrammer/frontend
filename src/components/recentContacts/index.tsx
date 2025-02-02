import { XFilled } from "@ant-design/icons";
import { Empty } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useFrequentContacts } from "../../core/hooks/useFrequentContacts";
import { ContactItem } from "../contactItem";
import { useStyles } from "./style";

function RecentContacts() {
  const classes = useStyles();
  const { t } = useTranslation();

  const { frequentContacts } = useFrequentContacts();

  const hasRecentContacts = !!frequentContacts && !!frequentContacts.length;

  return (
    <div className={classes.recentContacts}>
      <div style={{ paddingBottom: 10 }}>
        <XFilled className={classes.bulletIcon} />
        <label style={{ marginLeft: 8 }}>{t("recentContacts")}</label>
      </div>
      <div
        className={classes.contactListContainer}
        style={{ display: hasRecentContacts ? "grid" : "flex" }}
      >
        {hasRecentContacts ? (
          frequentContacts.map((item, index) => (
            <Link to={`/contact/${item.id}`} key={item.id}>
              <ContactItem
                id={item.id}
                avatarPic={item.avatar}
                name={item.name}
                phone={item.phone}
                city={item.city}
                isRecentContact
                order={index + 1}
              />
            </Link>
          ))
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description=""
            className={classes.empty}
          />
        )}
      </div>
    </div>
  );
}

export default React.memo(RecentContacts);
