import React from "react";
import { Form, Checkbox } from "antd";

import DetailsCard from "../../../components/DetailsCard";
import "./index.less";

export default () => {
  return (
    <div className="list">
      <div className="search-list">
        <div className="title">
          <span>区域找房</span>
        </div>
        <Form labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
          <Form.Item label="区域">
            <Checkbox.Group>
              <Checkbox>不限</Checkbox>
              <Checkbox>宝山</Checkbox>
              <Checkbox>浦东</Checkbox>
              <Checkbox>青浦</Checkbox>
              <Checkbox>虹口</Checkbox>
              <Checkbox>珠海</Checkbox>
              <Checkbox>嘉定</Checkbox>
              <Checkbox>徐汇</Checkbox>
              <Checkbox>长宁</Checkbox>
              <Checkbox>静安</Checkbox>
              <Checkbox>奉贤</Checkbox>
              <Checkbox>金山</Checkbox>
              <Checkbox>崇明</Checkbox>
              <Checkbox>崇明</Checkbox>
              <Checkbox>崇明</Checkbox>
              <Checkbox>崇明</Checkbox>
              <Checkbox>崇明</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="价格">
            <Checkbox.Group>
              <Checkbox>不限</Checkbox>
              <Checkbox>1500以下</Checkbox>
              <Checkbox>1500-3000</Checkbox>
              <Checkbox>3000-6000</Checkbox>
              <Checkbox>6000-10000</Checkbox>
              <Checkbox>10000以上</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="类型">
            <Checkbox.Group>
              <Checkbox>不限</Checkbox>
              <Checkbox>整租</Checkbox>
              <Checkbox>合租</Checkbox>
              <Checkbox>公寓</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="户型">
            <Checkbox.Group>
              <Checkbox>不限</Checkbox>
              <Checkbox>一居室</Checkbox>
              <Checkbox>两居室</Checkbox>
              <Checkbox>三居室</Checkbox>
              <Checkbox>四居室以上</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <hr color="#eee" />
          <Form.Item label="排序">综合 | 价格↓ | 面积↓</Form.Item>
        </Form>
      </div>
      <div className="content-list">
        <DetailsCard />
        <DetailsCard />
        <DetailsCard />
        <DetailsCard />
        <DetailsCard />
      </div>
    </div>
  );
};
