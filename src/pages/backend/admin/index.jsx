import React, { useState, useEffect } from "react";
import Tables from "../../../components/Tables";

import { getByPage } from "../../../service/AdminService";
import { message, Button } from "antd";

export const table = {
  name: "后台账户列表",
  columns: [
    {
      title: "序号",
      key: "number",
      render: (...args) => args[2] + 1
    },
    {
      title: "用户名",
      key: "username",
      dataIndex: "username"
    },
    {
      title: "密码",
      key: "password",
      dataIndex: "password"
    },
    {
      title: "当前状态",
      key: "status",
      dataIndex: "disabled",
      render: t => (!!t ? "冻结" : "正常")
    },
    {
      title: "操作记录",
      key: "record",
      render: t => <Button type="link">登录历史</Button>
    }
  ]
};

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

  const loadData = (params = { page: 0, size: 10, admin: true }) => {
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
    message.success("创建成功");
  };
  const handleChange = (page, size) => {
    loadData({ page: page - 1, size, admin: true });
  };

  return (
    <Tables
      table={table}
      loading={loading}
      data={data}
      create={handleCreate}
      onChange={handleChange}
    />
  );
};
