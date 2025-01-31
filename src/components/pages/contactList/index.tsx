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

  const {
    data: contactListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInitialLoading,
  } = useGetContactList();

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

  const SearchInput = () => (
    <Input
      placeholder="Search in Snapp! Contacts"
      variant="filled"
      size="large"
      suffix={<SearchOutlined className="searchIcon" />}
    />
  );

  const AllContactsLabel = () => (
    <div style={{ paddingBottom: 5 }}>
      <XFilled className={classes.bulletIcon} />
      <label style={{ marginLeft: 8 }}>All Contacts</label>
    </div>
  );

  const renderContactItems = () => {
    return contactListData?.pages.map((page, pageIndex) =>
      page.items.map((contact, index) => {
        const isLastItem =
          pageIndex === contactListData.pages.length - 1 &&
          index === page.items.length - 1;
        return (
          <ContactItem
            key={contact.id}
            ref={isLastItem ? lastContactRef : null}
          />
        );
      }),
    );
  };

  const renderSkeletons = () =>
    [1, 2, 3, 4, 5, 6, 7, 8].map((item: number) => (
      <SkeletonContactItem key={item} />
    ));

  return (
    <>
      <SearchInput />
      <RecentContacts />
      <div className={classes.allContacts}>
        <AllContactsLabel />
        {isInitialLoading ? (
          renderSkeletons()
        ) : (
          <div className={classes.contactListContainer}>
            {isFetchingNextPage && <SkeletonContactItem />}
            {renderContactItems()}
          </div>
        )}
      </div>
      {/* <Link to={`/contact/1`}>Contact #1</Link> */}
    </>
  );
}

export default ContactList;
