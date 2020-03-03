import React from "react";
import { Result, Button } from "antd";

export default () => {
  return (
    <Result
      status="404"
      title="页面缺失"
      subTitle="抱歉，页面找不到了..."
      extra={
        <Button href="/#/b/home" type="primary">
          返回首页
        </Button>
      }
    />
  );
};
