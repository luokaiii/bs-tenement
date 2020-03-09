import React, { useState, useEffect } from "react";
import { Row, Col, Tag, Button, Modal, Carousel, message } from "antd";

import { getById } from "../../../service/HouseApi";
import "./index.less";

export default ({ match }) => {
  const [house, setHouse] = useState({ pictures: "" });
  const [visible, setVisible] = useState(false);
  const { id } = match.params;
  const images = house.pictures.split(",");

  useEffect(() => {
    getById(id)
      .then(res => {
        setHouse(res.data);
      })
      .catch(() => {
        message.error("房屋不存在");
        window.location.href = "/#/f/home";
      });
  }, [id]);

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
              {images.map((v, i) => (
                <div key={i}>
                  <img src={v} height="600" alt="" />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="white-p service">
            <div className="title">费用详情</div>
            <Row>
              <Col span={12}>电费：{house.electric}元/度</Col>
              <Col span={12}>水费：{house.water}元/吨</Col>
              <Col span={12}>网费：{house.gmfs}元/月</Col>
            </Row>
          </div>
          <div className="white-p service">
            <div className="title">地理位置</div>
            <div>
              {house.province}/{house.city}/{house.address}
            </div>
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={8} className="white d2">
          <h1>{house.name}</h1>
          <div>
            <Tag>房租月付</Tag>
            <Tag>独卫</Tag>
            <Tag>新上架</Tag>
            <Tag>电梯房</Tag>
          </div>
          <div className="hr"></div>
          <div>
            <span className="d21">
              <span className="d211">
                {house.price > 100000
                  ? house.price / 10000 + "万"
                  : house.price}
              </span>
              <span className="d212">元{house.type === "RENT" && "/月"}</span>
            </span>
            <span className="d21">{house.area}㎡</span>
            <span className="d21">朝南</span>
          </div>
          <div className="hr"></div>
          <Row>
            <Col span={12}>交通：{house.estate}</Col>
            <Col span={12}>
              楼层：{house.floor}层/{house.floors}层
            </Col>
            <Col span={12}>类型：{house.ownerType}</Col>
            <Col span={12}>付款：{house.priceType}</Col>
            <Col span={12}>区域：{house.city}</Col>
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
        请拨打电话"{house.userPhone || '18867891234'}"与房主联系预约
      </Modal>
    </div>
  );
};
