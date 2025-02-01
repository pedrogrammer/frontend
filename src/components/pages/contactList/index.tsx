import React, { useCallback, useReducer, useRef } from "react";
import { Link } from "react-router-dom";
import { Empty, Input, Select, Space } from "antd";
import {
  ExclamationCircleOutlined,
  SearchOutlined,
  XFilled,
} from "@ant-design/icons";
import RecentContacts from "../../recentContacts";
import { ContactItem, SkeletonContactItem } from "../../contactItem";
import { useStyles } from "./style";
import { useGetContactList } from "../../../core/services/hooks";
import { ContactListFilterRequestType } from "../../../core/services/types";

type ContactListFilterRequestWithInputType = ContactListFilterRequestType & {
  input_type: {
    contains: "phone" | "name";
  };
};

type Action =
  | { type: "SET_FIRST_NAME"; payload: string }
  | { type: "SET_LAST_NAME"; payload: string }
  | { type: "SET_PHONE"; payload: string }
  | { type: "SET_INPUT_TYPE"; payload: "phone" | "name" };

const filterReducer = (
  state: ContactListFilterRequestWithInputType,
  action: Action,
): ContactListFilterRequestWithInputType => {
  switch (action.type) {
    case "SET_FIRST_NAME":
      return { ...state, first_name: { contains: action.payload } };
    case "SET_LAST_NAME":
      return { ...state, last_name: { contains: action.payload } };
    case "SET_PHONE":
      return { ...state, phone: { contains: action.payload } };
    case "SET_INPUT_TYPE":
      return { input_type: { contains: action.payload } };
    default:
      return state;
  }
};

function ContactList() {
  const classes = useStyles();

  const [filters, dispatch] = useReducer(filterReducer, {
    input_type: { contains: "phone" },
  });

  const {
    data: contactListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetContactList({
    filter: {
      phone: {
        contains:
          filters.input_type.contains === "phone"
            ? filters.phone?.contains || ""
            : "",
      },
      first_name: {
        contains:
          filters.input_type.contains === "name"
            ? filters.first_name?.contains || ""
            : "",
      },
      last_name: {
        contains:
          filters.input_type.contains === "name"
            ? filters.last_name?.contains || ""
            : "",
      },
    },
  });

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

  const searchTypeOptions = [
    {
      value: "phone",
      label: "Phone",
    },
    {
      value: "name",
      label: "Name",
    },
  ];

  const searchInput = (
    <Space.Compact>
      {filters.input_type.contains === "phone" && (
        <Input
          value={filters.phone?.contains || ""}
          onChange={(e) => {
            dispatch({ type: "SET_PHONE", payload: e.target.value });
          }}
          placeholder="Search in Snapp! Contacts"
          variant="filled"
          size="large"
          suffix={<SearchOutlined className="searchIcon" />}
          disabled={isError}
        />
      )}
      {filters.input_type.contains === "name" && (
        <>
          <Input
            value={filters.first_name?.contains || ""}
            onChange={(e) => {
              dispatch({ type: "SET_FIRST_NAME", payload: e.target.value });
            }}
            placeholder="First Name"
            variant="filled"
            size="large"
            disabled={isError}
          />
          <Input
            value={filters.last_name?.contains || ""}
            onChange={(e) => {
              dispatch({ type: "SET_LAST_NAME", payload: e.target.value });
            }}
            placeholder="Last Name"
            variant="filled"
            size="large"
            disabled={isError}
          />
        </>
      )}
      <Select
        value={filters.input_type.contains}
        onChange={(value: "phone" | "name") => {
          dispatch({ type: "SET_INPUT_TYPE", payload: value });
        }}
        options={searchTypeOptions}
        variant="filled"
        size="large"
        disabled={isError}
      />
    </Space.Compact>
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
            avatarPic={contact.avatar}
            name={`${contact.first_name} ${contact.last_name}`}
            city={contact.address}
            phone={contact.phone}
          />
        );
      }),
    );
  };

  const renderSkeletons = () =>
    [1, 2, 3, 4, 5, 6, 7, 8].map((item: number) => (
      <SkeletonContactItem key={item} />
    ));

  const listErrorElement = (
    <div className={classes.listError}>
      <ExclamationCircleOutlined className={classes.listErrorIcon} />
      <p>Oops, there was an error getting list!</p>
    </div>
  );

  return (
    <>
      {searchInput}
      <RecentContacts />
      <div className={classes.allContacts}>
        <AllContactsLabel />
        <div className={classes.contactListContainer}>
          {isLoading ? (
            renderSkeletons()
          ) : (
            <>
              {renderContactItems()}
              {isFetchingNextPage && <SkeletonContactItem />}
            </>
          )}
          {isError && listErrorElement}
          {contactListData?.pages[0].meta.total === 0 && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No matching items found!"
            />
          )}
        </div>
      </div>
      {/* <Link to={`/contact/1`}>Contact #1</Link> */}
    </>
  );
}

export default ContactList;
