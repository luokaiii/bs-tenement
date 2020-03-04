import React from "react";
import { Row, Col, Tag } from "antd";

import "./index.less";

export default () => {
  return (
    <div className="details">
      <Row>
        <Col span={15} className="d1">
          <div className="white-p picture">图片列表</div>
          <div className="white-p service">服务保证</div>
          <div className="white-p facility">设施保障</div>
          <div className="white-p price">电费，水费，燃气费</div>
        </Col>
        <Col span={1}></Col>
        <Col span={8} className="white d2">
          <h1>润江花园</h1>
          <div>
            <Tag>房租月付</Tag>
            <Tag>独卫</Tag>
            <Tag>新上架</Tag>
            <Tag>电梯房</Tag>
          </div>
          <div className="hr"></div>
          <div>
            <span className="d21">
              <span className="d211">1550</span>
              <span className="d212">元/月</span>
            </span>
            <span className="d21">30㎡</span>
            <span className="d21">朝南</span>
          </div>
          <div className="hr"></div>
          <Row>
            <Col span={12}>交通：临近4号线</Col>
            <Col span={12}>楼层：7层/18层</Col>
            <Col span={12}>类型：合租-次卧</Col>
            <Col span={12}>付款：月付</Col>
            <Col span={12}>区域：松江</Col>
          </Row>
          <div>这里放个广告？</div>
        </Col>
      </Row>
    </div>
  );
};
