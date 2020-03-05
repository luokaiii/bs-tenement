import React, { useState } from "react";
import { Row, Col, Tag, Button, Modal, Carousel } from "antd";

import "./index.less";

export default () => {
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div className="details">
      <Row>
        <Col span={15} className="d1">
          <div className="white-p picture">
            <Carousel autoplay>
              <div>
                <img
                  src="http://cdn.baletoo.cn/Uploads/housephoto/5489/5488243/oss_5d147cec0d075.jpg@!blth"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="http://cdn.baletoo.cn/Uploads/housephoto/5489/5488243/oss_5d147d28e1848.jpg@!blth"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="http://cdn.baletoo.cn/Uploads/housephoto/5489/5488243/oss_5d147d1b27410.jpg@!blth"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="http://cdn.baletoo.cn/Uploads/housephoto/5489/5488243/oss_5d147cf86bcd6.jpg@!blth"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="http://cdn.baletoo.cn/Uploads/housephoto/5489/5488755/oss_f124c142902a4c86.png@!blth"
                  alt=""
                />
              </div>
            </Carousel>
          </div>
          <div className="white-p service">
            <div className="title">费用详情</div>
            <Row>
              <Col span={12}>电费：1元/度</Col>
              <Col span={12}>水费：6元/吨</Col>
              <Col span={12}>网费：50元/月</Col>
            </Row>
          </div>
          <div className="white-p service">
            <div className="title">地理位置</div>
            <div>上海市/宝山区/湄浦路310弄/果园公寓301室</div>
          </div>
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
          <div className="hr" />
          <div>
            <Button block type="primary" onClick={openModal}>
              立即预约
            </Button>
          </div>
        </Col>
      </Row>
      <Modal
        footer={null}
        visible={visible}
        onCancel={closeModal}
        onOk={closeModal}
      >
        请拨打电话"+86 13700000001"与房主联系预约
      </Modal>
    </div>
  );
};
