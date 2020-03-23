import React from "react";
import { Form, Input, Icon, Checkbox, Button, message } from "antd";

import { useUser, STORE_CURRENT_USER } from "../../../store/index";
import { login, ping } from "../../../service/UserService";
import "./index.less";

export default Form.create()(({ form }) => {
  const { getFieldDecorator } = form;
  const { dispatch } = useUser();

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        login(values.username, values.password)
          .then(() => {
            message.success("登录成功，2秒后跳转至首页...");
            ping()
              .then(res => {
                dispatch({
                  type: STORE_CURRENT_USER,
                  payload: {
                    user: res.data,
                    isLogin: true,
                    isAdmin: res.data.role === "ADMIN",
                    isSuperAdmin: res.data.role === "SUPER_ADMIN"
                  }
                });
              })
              .then(() => {
                setTimeout(() => {
                  window.location.href = "/#/f/home";
                }, 1500);
              });
          })
          .catch(() => {
            message.error("登录失败");
          });
      }
    });
  };

  return (
    <div className="login">
      <div style={{ height: "150px" }}></div>
      <div className="login-div">
        <h2 className="title">欢迎登陆</h2>
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
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Checkbox>记住我</Checkbox>
            <Button type="primary" htmlType="submit" block>
              登 录
            </Button>
            <div style={{textAlign:"right"}}>
              忘记密码？点我<Button type="link" href="/#/f/reset">找回密码</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
