import React, { useState, useEffect } from "react";
import { Row, Col, Tag, Button, Modal, Carousel, message, Affix } from "antd";

import {
  HouseOwnerTypeText,
  HousePriceType
} from "../../../components/constants";
import { getById, getByPage } from "../../../service/HouseApi";
import DetailsCard from "../../../components/DetailsCard";
import GoodsCard from "../../../components/GoodsCard";
import Image1 from "../../../static/1.png";
import Image3 from "../../../static/3.png";
import Image4 from "../../../static/4.png";
import Image7 from "../../../static/7.png";
import "./index.less";

export default ({ match }) => {
  const [house, setHouse] = useState({ pictures: "" });
  const [recommends, setRecommends] = useState([]);
  const [visible, setVisible] = useState(false);
  const { id } = match.params;
  const images = house.pictures.split(",");

  useEffect(() => {
    Promise.all([getById(id), getByPage({ page: 0, size: 4 })])
      .then(res => {
        setHouse(res[0].data);
        setRecommends(res[1].data.content);
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
          <div className="white-p facility">
            <div className="title">独用设施</div>
            <Row>
              <Col span={6}>
                <img alt="" src={Image1} />
              </Col>
              <Col span={6}>
                <img alt="" src={Image3} />
              </Col>
              <Col span={6}>
                <img alt="" src={Image4} />
              </Col>
              <Col span={6}>
                <img alt="" src={Image7} />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={8}>
          <div className="white d2">
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
              <Col span={12}>类型：{HouseOwnerTypeText[house.ownerType]}</Col>
              <Col span={12}>付款：{HousePriceType[house.priceType]}</Col>
              <Col span={12}>区域：{house.city}</Col>
            </Row>
            <div className="hr" />
            <div>
              <Button block type="primary" onClick={openModal}>
                立即预约
              </Button>
            </div>
          </div>
          <div className="white d2 recommend">
            <h2>相关推荐</h2>
            {recommends.slice(0, 2).map((v, i) => (
              <DetailsCard data={v} key={i} />
            ))}
          </div>
        </Col>
        <Col span={24} className="d3">
          <div className="title">
            地理位置{" "}
            <Button
              type="link"
              href={`https://www.amap.com/search?query=${house.province}${house.city}${house.address}`}
            >
              前往高德地图
            </Button>
          </div>
          <iframe
            title="地图"
            src={`https://www.amap.com/search?query=${house.province}${house.city}${house.address}`}
            height="500px"
            width="100%"
          />
        </Col>
        <Col span={24} className="d4">
          <div className="title">相似推荐</div>
          <div className="list">
            {recommends.map((v, i) => (
              <GoodsCard data={v} key={i} />
            ))}
          </div>
        </Col>
      </Row>
      <Modal
        footer={null}
        visible={visible}
        onCancel={closeModal}
        onOk={closeModal}
      >
        请拨打电话"{house.userPhone || "18867891234"}"与房主联系预约
      </Modal>
    </div>
  );
};
