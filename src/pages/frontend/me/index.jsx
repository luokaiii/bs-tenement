import React, { useState, useEffect, useCallback } from "react";
import {
  Descriptions,
  Table,
  Divider,
  message,
  Button,
  Modal,
  Input,
  Row,
  Col
} from "antd";

import {
  HouseStatusText,
  formatDate,
  showConfirm
} from "../../../components/constants";
import { update as updateUser, getById } from "../../../service/UserService";
import { getByPage, updateStatus } from "../../../service/HouseApi";
import { useUser } from "../../../store/index";
import "./index.less";
import { Link } from "react-router-dom";

const StatusOperate = (update, r) => {
  if (r.status === "ADDED") {
    return <Button onClick={() => update(r.id, "OUT")}>下架</Button>;
  } else if (r.status === "OUT" || r.status === "FAILED") {
    return <Button onClick={() => update(r.id, "CREATED")}>重新审核</Button>;
  } else {
    return "等待审核...";
  }
};

const columns = update => [
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
    title: "状态",
    key: "status",
    dataIndex: "status",
    render: t => HouseStatusText[t]
  },
  {
    title: "发布时间",
    key: "createTime",
    dataIndex: "createTime",
    render: t => formatDate(t)
  },
  {
    title: "操作",
    key: "operate",
    render: (t, r) => StatusOperate(update, r)
  },
  {
    title: "编辑",
    key: "edit",
    render: (t, r) => <Link to={`/f/publish/SELL/${r.id}`}>编辑</Link>
  }
];

export default () => {
  const [mySell, setMySell] = useState({});
  const [myRent, setMyRent] = useState({});
  const [modify, setModify] = useState(false);
  const [loginUser, setLoginUser] = useState({});
  const [nickname, setNickname] = useState("");
  const userContext = useUser();
  const { user, isLogin } = userContext.state;

  if (!isLogin) {
    window.location.href = "/";
  }

  const update = (id, s) => {
    showConfirm(() =>
      updateStatus(id, s)
        .then(() => {
          message.success("修改成功");
          loadData1(0);
          loadData2(0);
        })
        .catch(() => {
          message.error("修改失败");
        })
    );
  };

  const loadUser = useCallback(() => {
    getById(user.id).then(res => {
      setLoginUser(res.data);
      setNickname(res.data.nickname);
    });
  }, [user]);

  const loadData1 = useCallback(
    page => {
      getByPage({
        page,
        size: 4,
        userId: user.id,
        type: "SELL"
      }).then(res => {
        setMySell(res.data);
      });
    },
    [user]
  );

  const loadData2 = useCallback(
    page => {
      getByPage({
        page,
        size: 4,
        userId: user.id,
        type: "RENT"
      }).then(res => {
        setMyRent(res.data);
      });
    },
    [user]
  );

  useEffect(() => {
    loadUser();
    loadData1(0);
    loadData2(0);
  }, [loadUser, loadData1, loadData2]);

  const pagination1 = {
    current: mySell.number + 1,
    total: mySell.totalElements,
    pageSize: mySell.size,
    onChange: (page, size) => {
      loadData1(page - 1);
    }
  };

  const pagination2 = {
    current: myRent.number + 1,
    total: myRent.totalElements,
    pageSize: myRent.size,
    onChange: (page, size) => {
      loadData2(page - 1);
    }
  };

  const updateUsername = () => {
    user.nickname = nickname;
    updateUser(user.id, user).then(res => {
      setModify(false);
    });
  };

  return (
    <div className="me">
      <div className="title">用户信息</div>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="头像">
          <img alt="" src={loginUser.avatar} height="50px" />
        </Descriptions.Item>
        {modify ? (
          <Descriptions.Item label="昵称">
            <Row>
              <Col span={10}>
                <Input
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                />
              </Col>
              <Col span={6}>
                <Button onClick={updateUsername}>保存</Button>
              </Col>
            </Row>
          </Descriptions.Item>
        ) : (
          <Descriptions.Item label="昵称">
            {nickname} <Button onClick={() => setModify(true)}>修改</Button>
          </Descriptions.Item>
        )}

        <Descriptions.Item label="用户名">
          {loginUser.username}
        </Descriptions.Item>
        <Descriptions.Item label="手机号">{loginUser.phone}</Descriptions.Item>
      </Descriptions>
      <Divider children="我发布的二手房" orientation="left" />
      <Table
        columns={columns(update)}
        rowKey={r => r.id}
        bordered
        dataSource={mySell.content}
        pagination={pagination1}
      />
      <Divider children="我发布的租房" orientation="left" />
      <Table
        columns={columns(update)}
        rowKey={r => r.id}
        bordered
        dataSource={myRent.content}
        pagination={pagination2}
      />
    </div>
  );
};
