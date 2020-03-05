import React, { useState } from "react";
import { Form, Input, Icon, Button, Row, Col, InputNumber } from "antd";

import "./index.less";

export default Form.create()(({ form }) => {
  const [authCode, setAuthCode] = useState(
    Math.floor(Math.random() * 9000) + 1000
  );
  const { getFieldDecorator } = form;

  const checkUsername = (rule, value, callback) => {
    if (value && (value.length < 6 || value.length > 18)) {
      callback("用户名长度不正确");
    } else {
      callback();
    }
  };

  const checkPassword = (rule, value, callback) => {
    if (value && (value.length < 6 || value.length > 18)) {
      callback("密码长度不正确");
    } else {
      callback();
    }
  };

  const checkAuthCode = (rule, value, callback) => {
    if (value && value + "" !== authCode + "") {
      callback("验证码不正确");
    } else {
      callback();
    }
  };

  const checkConfirmPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("两次密码不一致");
    } else {
      callback();
    }
  };

  const updateCode = () => {
    setAuthCode(Math.floor(Math.random() * 9000) + 1000);
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  return (
    <div className="login">
      <div className="login-div">
        <h2 className="title">注 册</h2>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "用户名不能为空" },
                { validator: checkUsername }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名 为6-18位字母、数字组合"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("nickname", {
              rules: [{ required: true, message: "昵称不能为空" }]
            })(
              <Input
                prefix={
                  <Icon type="smile" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="昵称 为2-12位字符"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "联系方式不能为空" }]
            })(
              <Input
                prefix={
                  <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入联系方式"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "密码不能为空" },
                { validator: checkPassword }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码 为6-18位字母、数字组合"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password2", {
              rules: [
                { required: true, message: "请再次输入密码" },
                { validator: checkConfirmPassword }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="请再次输入密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("auth-code", {
              rules: [
                { required: true, message: "验证码不能为空" },
                { validator: checkAuthCode }
              ]
            })(
              <Row>
                <Col span={16}>
                  <InputNumber placeholder="请输入验证码" max={9999} />
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
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              注 册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
