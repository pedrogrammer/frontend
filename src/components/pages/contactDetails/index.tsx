import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetContact } from "../../../core/services/hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  LeftOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useStyles } from "./style";
import { useTranslation } from "react-i18next";

function ContactDetails() {
  const classes = useStyles();
  const { t } = useTranslation();

  const { id } = useParams();

  const { data, isError } = useGetContact({ id: id || "0" }, { enabled: !!id });

  return (
    <div className={classes.contactDetails}>
      <div className={classes.imgContainer}>
        <Link to={"/"} className={classes.returnBtn}>
          <LeftOutlined />
        </Link>
        <div className={classes.bottomBlur} />
        <div className={classes.topInfoContainer}>
          <div className={classes.title}>
            {isError ? (
              <div>
                <ExclamationCircleOutlined className={classes.errorIcon} />
                {t("loadingDataFailed")}
              </div>
            ) : (
              `${data?.first_name || ""} ${data?.last_name || ""}`
            )}
          </div>
          <span className={classes.subTopInfoContainer}>
            <EnvironmentOutlined style={{ marginRight: 4 }} />
            {data?.address || "N/A"}
          </span>
          <span
            className={classes.subTopInfoContainer}
            style={{
              marginLeft: 8,
            }}
          >
            <ShopOutlined style={{ marginRight: 4 }} />
            {data?.company || "N/A"}
          </span>
        </div>
        {data?.avatar ? (
          <LazyLoadImage
            src={data?.avatar}
            alt="avatar"
            effect="blur"
            width="100%"
          />
        ) : (
          <UserOutlined className={classes.avatarPlaceholderIcon} />
        )}
      </div>
      <div style={{ padding: 20 }}>
        <div className={classes.infoContainer}>
          <div className={classes.info}>
            <div>{t("mobile")}</div>
            <div className={classes.infoData}>
              {data?.phone.match(/.{1,3}/g)?.join(" ") || ""}
            </div>
          </div>
          {data?.telegram && (
            <div className={classes.info}>
              <div>{t("username")}</div>
              <div className={classes.infoData}>@{data?.telegram}</div>
            </div>
          )}
          <div>
            <div>{t("bio")}</div>
            <div>{data?.note}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
