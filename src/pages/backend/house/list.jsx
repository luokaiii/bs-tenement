import React from "react";
import { Table, Button } from "antd";

import Search from "../../../components/Search";

const HouseType = {
  RENT: "出租房",
  SELL: "二手房"
};
const StatusText = {
  CREATED: "审核",
  ADDED: "管理",
  OUT: "未上架记录",
  FAILED: "审核失败记录"
};
const StatusOperate = {
  CREATED: <Button>审核通过</Button>,
  ADDED: <Button>下架</Button>,
  OUT: <Button>重新上架</Button>,
  FAILED: <Button>重新上架</Button>
};

const searchItems = [
  {
    key: "userNickname",
    label: "发布人"
  }
];
const columns = [
  {
    title: "序号",
    key: "number",
    render: (...args) => args[2] + 1
  },
  {
    title: "房屋名称",
    key: "name",
    dataIndex: "name"
  },
  {
    title: "封面",
    key: "cover",
    dataIndex: "cover"
  },
  {
    title: "地址",
    key: "address",
    dataIndex: "address"
  },
  {
    title: "价格",
    key: "price",
    dataIndex: "price"
  },
  {
    title: "面积",
    key: "area",
    dataIndex: "area"
  },
  {
    title: "发布人",
    key: "userNickname",
    dataIndex: "userNickname"
  },
  {
    title: "操作",
    key: "status",
    dataIndex: "status",
    render: t => StatusOperate[t]
  }
];

export default ({ match }) => {
  const { type, status } = match.params;
  return (
    <div>
      <div className="top">
        <div className="left">
          <h2>
            {HouseType[type]}
            {StatusText[status]}
          </h2>
        </div>
      </div>
      <Search searchItems={searchItems} />
      <Table columns={columns} bordered />
    </div>
  );
};
