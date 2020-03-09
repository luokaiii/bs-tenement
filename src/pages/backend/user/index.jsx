import React, { useState, useEffect, useCallback } from "react";
import { getByPage, updateDisabled } from "../../../service/UserService";
import { message, Table, Button, Modal } from "antd";

import { useUser } from "../../../store/index";
import CreateForm from "./create";
import Search from "../../../components/Search";

const RoleText = {
  CUSTOMER: "用户",
  ADMIN: "管理员",
  SUPER_ADMIN: "超级管理员"
};
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

const columns = (update, role, isAdmin, isSuperAdmin) => [
  {
    title: "序号",
    key: "number",
    render: (...args) => args[2] + 1
  },
  {
    title: "头像",
    key: "avatar",
    dataIndex: "avatar",
    render: t => <img src={t} alt="" height="40px" />
  },
  {
    title: "昵称",
    key: "nickname",
    dataIndex: "nickname"
  },
  {
    title: "用户名",
    key: "username",
    dataIndex: "username"
  },
  {
    title: "联系方式",
    key: "phone",
    dataIndex: "phone"
  },
  {
    title: "当前状态",
    key: "status",
    dataIndex: "disabled",
    render: t => (!!t ? "冻结" : "正常")
  },
  {
    title: "操作",
    key: "operate",
    dataIndex: "disabled",
    render: (t, r) => {
      if (role === "ADMIN") {
        if (isSuperAdmin) {
          return !!t ? (
            <Button onClick={() => update(r.id, false)}>启用</Button>
          ) : (
            <Button onClick={() => update(r.id, true)}>禁用</Button>
          );
        } else {
          return <></>;
        }
      } else {
        if (isAdmin || isSuperAdmin) {
          return !!t ? (
            <Button onClick={() => update(r.id, false)}>启用</Button>
          ) : (
            <Button onClick={() => update(r.id, true)}>禁用</Button>
          );
        } else {
          return <></>;
        }
      }
    }
  }
];

export default ({ match }) => {
  const { role } = match.params;
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAdmin, isSuperAdmin } = useUser().state;

  const update = (id, disabled) => {
    updateDisabled(id, disabled)
      .then(() => {
        message.success("修改成功");
        loadData();
      })
      .catch(() => {
        message.error("修改失败");
      });
  };

  const loadData = useCallback(
    (params = { page: 0, size: 10, role }) => {
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
    },
    [role]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const pagination = {
    current: data.number + 1,
    total: data.totalElements,
    pageSize: data.size,
    onChange: (page, size) => {
      loadData({ page: page - 1, size });
    }
  };

  return (
    <div>
      <div className="top">
        <div className="left">
          <h2>{RoleText[role]}管理</h2>
        </div>
        <div className="right">
          {isSuperAdmin && role === "ADMIN" && (
            <Button onClick={() => setVisible(true)}>创建</Button>
          )}
        </div>
      </div>
      <Search searchItems={searchItems} handleChangeParams={loadData} />
      <Table
        bordered
        columns={columns(update, role, isAdmin, isSuperAdmin)}
        loading={loading}
        dataSource={data.content}
        pagination={pagination}
      />
      <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
        <CreateForm />
      </Modal>
    </div>
  );
};
