import React, { useContext } from "react";
import { Form, Input, Icon, Checkbox, Button, message } from "antd";

import { UserContext, useUser, STORE_CURRENT_USER } from "../../../store/index";
import { login } from "../../../service/UserService";
import "./index.less";

export default Form.create()(({ form }) => {
  const { getFieldDecorator } = form;
  const { dispatch } = useUser();

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        login(values.username, values.password).then(res => {
          message.success("登录成功，2秒后跳转至首页...");
          dispatch({
            type: STORE_CURRENT_USER,
            payload: {
              user: res.data,
              isLogin: true,
              isAdmin:
                res.data.role === "ADMIN" || res.data.role === "SUPER_ADMIN"
            }
          });
          setTimeout(() => {
            window.location.href = "/#/f/home";
          }, 1500);
        });
      }
    });
  };

  return (
    <div className="login">
      <div className="login-div">
        <h2 className="title">登 录</h2>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "用户名不能为空" }]
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
              rules: [{ required: true, message: "密码不能为空" }]
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
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
