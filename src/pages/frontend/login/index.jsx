import React from "react";
import { Form, Input, Icon, Checkbox, Button } from "antd";

import "./index.less";

export default Form.create()(({ form }) => {
  const { getFieldDecorator } = form;

  return (
    <div className="login">
      <div className="login-div">
        <h2 className="title">登 录</h2>
        <Form className="form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: '用户名不能为空' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: '密码不能为空' }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Checkbox>记住我</Checkbox>
            <Button type="primary" style={{ width: "100%" }}>
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
