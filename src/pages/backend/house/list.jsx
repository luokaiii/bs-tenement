import React, { useState, useEffect, useCallback } from "react";
import { Table, Button } from "antd";

import { getByPage } from "../../../service/HouseApi";
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
  },
  {
    key: "name",
    label: "房屋名称"
  },
  {
    key: "keys",
    label: "关键词"
  },
  {
    key: "estate",
    label: "小区"
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
    dataIndex: "cover",
    render: t => <img src={t} alt="" height="40px" />
  },
  {
    title: "地址",
    key: "address",
    dataIndex: "address"
  },
  {
    title: "价格",
    key: "price",
    dataIndex: "price",
    render: t => t + "元"
  },
  {
    title: "面积",
    key: "area",
    dataIndex: "area",
    render: t => t + " 平米"
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
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const { type, status } = match.params;

  const loadData = useCallback(
    (params = { page: 0, size: 10 }) => {
      setLoading(true);
      const data = Object.assign({ type, status }, params);
      console.log(data);
      getByPage(data)
        .then(res => {
          setContent(res.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [type, status]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const pagination = {
    current: content.number + 1,
    total: content.totalElements,
    pageSize: content.size,
    onChange: (page, size) => {
      loadData({ page: page - 1 });
    }
  };

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
      <Search searchItems={searchItems} handleSearch={loadData} />
      <Table
        columns={columns}
        bordered
        loading={loading}
        dataSource={content.content}
        pagination={pagination}
      />
    </div>
  );
};
