import React from "react";
import { Button, Table } from "antd";

export default ({ table, loading, create, data, onChange }) => {
  const { name, columns, bordered } = table;
  const pagination = {
    current: data.number + 1,
    total: data.totalElements,
    pageSize: data.size,
    onChange
  };
  return (
    <div>
      <div className="top">
        <div className="left">
          <h2>{name || "管理列表"}</h2>
        </div>
        <div className="right">
          <Button type="primary" onClick={create}>
            创建
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data.content}
        loading={loading}
        bordered={bordered || true}
        rowKey={r => r.id}
        pagination={pagination}
      />
    </div>
  );
};
