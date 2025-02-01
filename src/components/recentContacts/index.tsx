import React from "react";
import { XFilled } from "@ant-design/icons";
import { ContactItem } from "../contactItem";
import { Empty } from "antd";
import { useStyles } from "./style";
import { useFrequentContacts } from "../../core/hooks/useFrequentContacts";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function RecentContacts() {
  const classes = useStyles();
  const { t } = useTranslation();

  const { frequentContacts } = useFrequentContacts();

  return (
    <div className={classes.recentContacts}>
      <div style={{ paddingBottom: 10 }}>
        <XFilled className={classes.bulletIcon} />
        <label style={{ marginLeft: 8 }}>{t("recentContacts")}</label>
      </div>
      <div className={classes.contactListContainer}>
        {!!frequentContacts && !!frequentContacts.length ? (
          frequentContacts.map((item) => (
            <Link to={`/contact/${item.id}`} key={item.id}>
              <ContactItem
                id={item.id}
                avatarPic={item.avatar}
                name={item.name}
                phone={item.phone}
                city={item.city}
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
