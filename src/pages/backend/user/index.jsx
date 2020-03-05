import React, { useState, useEffect } from "react";
import Tables from "../../../components/Tables";

import Search from "../../../components/Search";
import { getByPage } from "../../../service/UserService";
import { table } from "./constants";
import { message } from "antd";

const searchItems = [
  {
    key: "nickname",
    label: "昵称"
  },
  {
    key: "phone",
    label: "联系方式"
  }
];

export default () => {
  const [data, setData] = useState({
    content: [
      {
        id: 1,
        nickname: "张老三",
        username: "zhangsan",
        phone: "13700012345",
        disabled: true
      },
      {
        id: 2,
        nickname: "李老四",
        username: "lisi",
        phone: "13700012346",
        disabled: false
      },
      {
        id: 3,
        nickname: "王老五",
        username: "wangwu",
        phone: "13700012347",
        disabled: false
      }
    ],
    number: 0,
    total: 2,
    size: 3
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = (params = { page: 0, size: 10, admin: false }) => {
    setLoading(true);
    getByPage(params)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        message.error("加载失败");
        setLoading(false);
      });
  };

  const handleCreate = () => {
    message.error("用户只能自行创建，无法后台添加");
  };
  const handleChange = () => {};

  return (
    <div>
      <div className="top">
        <div className="left">
          <h2>前台用户管理</h2>
        </div>
      </div>
      <Search searchItems={searchItems} />
      <Tables
        table={table}
        loading={loading}
        data={data}
        create={handleCreate}
        onChange={handleChange}
      />
    </div>
  );
};
