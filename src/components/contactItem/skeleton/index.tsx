import React from "react";
import { Skeleton, Space } from "antd";
import { useStyles } from "../style";

function SkeletonContactItem() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Skeleton.Avatar active size="large" style={{ width: 60, height: 60 }} />
      <Space direction="vertical" style={{ flex: 1 }}>
        <Skeleton.Input active size="small" style={{ height: 15 }} />
        <Skeleton.Input active size="small" block style={{ height: 15 }} />
      </Space>
    </div>
  );
}

export default SkeletonContactItem;
