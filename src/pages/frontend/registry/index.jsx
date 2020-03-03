import React, { useState } from "react";
import { Form, Input, Icon, Button, Row, Col } from "antd";

import "./index.less";

export default Form.create()(({ form }) => {
  const [authCode, setAuthCode] = useState(Math.floor(Math.random() * 9000) + 1000);
  const { getFieldDecorator } = form;

  const updateCode = () => {
    setAuthCode(Math.floor(Math.random() * 9000) + 1000);
  };

  return (
    <div className="login">
      <div className="login-div">
        <h2 className="title">注 册</h2>
        <Form className="form">
          <Form.Item>
            {getFieldDecorator("username")(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名 为6-18位字母、数字组合"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("nickname")(
              <Input
                prefix={
                  <Icon type="smile" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="昵称 为2-12位字符"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password")(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="密码 为6-18位字母、数字组合"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password2")(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请再次输入密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password2")(
              <Row>
                <Col span={16}>
                  <Input placeholder="请输入验证码" />
                </Col>
                <Col span={8}>
                  <div className="auth-code" onClick={updateCode}>
                    {authCode}
                  </div>
                </Col>
              </Row>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{ width: "100%" }}>
              注 册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
