// 搜索框组件，接收搜索字段、输入的类型、表单更改事件、重置事件等
import React from "react";
import { Form, Row, Col, Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { getFieldItem } from "./FormItemField";
import "./Search.less";

class SearchModel extends React.Component {
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("Received values of form: ", values);
      this.props.handleChangeParams(values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  getFields() {
    const { searchItems } = this.props;
    const { getFieldDecorator } = this.props.form;
    return searchItems.map(item => (
      <FormItemModel
        key={item.key}
        item={item}
        getFieldDecorator={getFieldDecorator}
      />
    ));
  }

  render() {
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const FormItemModel = ({ item, getFieldDecorator }) => (
  <Col lg={6} xs={12}>
    <FormItem
      key={item.key}
      wrapperCol={{ style: { minWidth: "60%" } }}
      label={item.label}
    >
      {getFieldDecorator(`${item.key}`, {
        rules: []
      })(getFieldItem(item))}
    </FormItem>
  </Col>
);

export default Form.create()(SearchModel);
