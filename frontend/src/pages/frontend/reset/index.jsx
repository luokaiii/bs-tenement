import React, { useState } from "react";
import {
  Form,
  Input,
  Icon,
  Button,
  Row,
  Col,
  InputNumber,
  message
} from "antd";

import { updatePassword } from "../../../service/UserService";
import "./index.less";

export default Form.create()(({ form }) => {
  const [authCode, setAuthCode] = useState();
  const { getFieldDecorator } = form;

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
        updatePassword(values.username, values.phone, values.password)
          .then(res => {
            message.success("重置成功");
            window.location.href = "/#/f/login";
          })
          .catch(e => {
            message.error("重置失败,请检查用户名与注册手机号是否相同");
          });
      }
    });
  };

  return (
    <div className="reset">
      <div style={{ height: "150px" }}></div>
      <div className="login-div">
        <h2 className="title">找回密码</h2>
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
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "必填项" }]
            })(
              <Input
                prefix={
                  <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入注册时的手机号"
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
                placeholder="请输入新密码"
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
                placeholder="请再次输入确认密码"
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
                    {authCode || <Icon type="sync" spin />}
                  </div>
                </Col>
              </Row>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              重置密码
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
