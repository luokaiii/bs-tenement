export const table = {
  name: "用户列表",
  columns: [
    {
      title: "序号",
      key: "number",
      render: (...args) => args[2] + 1
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
      title: "所在地",
      key: "address",
      render: (t, r) => r.province + r.city + r.county + r.address
    },
    {
      title: "当前状态",
      key: "status",
      dataIndex: "disabled",
      render: t => (!!t ? "冻结" : "正常")
    }
  ]
};
