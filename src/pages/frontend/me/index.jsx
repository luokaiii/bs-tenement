import React from "react";
import { Descriptions, Table, Divider } from "antd";

import "./index.less";

export default () => {
  return (
    <div className="me">
      <div className="title">用户信息</div>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="昵称">张三</Descriptions.Item>
        <Descriptions.Item label="用户名">zhangsan</Descriptions.Item>
        <Descriptions.Item label="手机号">13700000001</Descriptions.Item>
      </Descriptions>
      <Divider children="我发布的二手房" orientation="left" />
      <Table bordered />
      <Divider children="我发布的租房" orientation="left" />
      <Table bordered />
    </div>
  );
};
