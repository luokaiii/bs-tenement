import React from "react";
import { Form, Input, Icon, Button, message } from "antd";

import { profiles } from "../../../components/constants";
import { registry } from "../../../service/UserService";

export default Form.create()(({ form }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = Object.assign(
          {
            avatar: profiles[Math.floor(Math.random() * 12)],
            role: "ADMIN",
            disabled: false,
            createDate: new Date()
          },
          values
        );
        console.log(data);
        registry(data)
          .then(() => {
            message.success("添加成功");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch(() => {
            message.error("添加失败，用户已存在");
          });
      }
    });
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "用户名不能为空" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="用户名 为6-18位字母、数字组合"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "密码不能为空" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="密码 为6-18位字母、数字组合"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("nickname", {
          rules: [{ required: true, message: "昵称不能为空" }]
        })(
          <Input
            prefix={<Icon type="smile" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="昵称 为2-12位字符"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("phone", {
          rules: [{ required: true, message: "联系方式不能为空" }]
        })(
          <Input
            prefix={<Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="请输入联系方式"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          添 加
        </Button>
      </Form.Item>
    </Form>
  );
});
