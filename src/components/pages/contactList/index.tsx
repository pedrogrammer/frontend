import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { SearchOutlined, XFilled } from "@ant-design/icons";
import RecentContacts from "../../recentContacts";
import { ContactItem, SkeletonContactItem } from "../../contactItem";
import { useStyles } from "./style";
import { useGetContactList } from "../../../core/services/hooks";

function ContactList() {
  const classes = useStyles();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetContactList();

  // Create a reference for the last contact item
  const observer = useRef<IntersectionObserver | null>(null);

  const lastContactRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, isFetchingNextPage, hasNextPage],
  );

  return (
    <>
      <Input
        placeholder="Search in Snapp! Contacts"
        variant="filled"
        size="large"
        suffix={<SearchOutlined className={classes.searchIcon} />}
      />
      <RecentContacts />
      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 200,
        }}
      >
        <div style={{ paddingBottom: 5 }}>
          <XFilled className={classes.bulletIcon} />
          <label style={{ marginLeft: 8 }}>All Contacts</label>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: 10,
            paddingTop: 5,
            paddingInline: 2,
            overflowY: "scroll",
            scrollbarGutter: "stable both-edges;",
          }}
        >
          {data?.pages.map((page, pageIndex) =>
            page.items.map((contact, index) => {
              const isLastItem =
                pageIndex === data.pages.length - 1 &&
                index === page.items.length - 1;
              return (
                <ContactItem
                  key={contact.id}
                  ref={isLastItem ? lastContactRef : null}
                />
              );
            }),
          )}
          {isFetchingNextPage && <SkeletonContactItem />}
        </div>
      </div>
      {/* <Link to={`/contact/1`}>Contact #1</Link> */}
    </>
  );
}

export default ContactList;
