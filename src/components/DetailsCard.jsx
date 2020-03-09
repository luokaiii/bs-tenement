import React from "react";

import { formatDate } from "../components/constants";
import {
  HouseOwnerTypeText,
  HousePlanText,
  HouseTypeTagText
} from "./constants";
import "./DetailsCard.less";
import { Tag } from "antd";

export default ({ data }) => {
  const gotoDetails = () => {
    window.location.href = `/#/f/details/${data.id}`;
  };

  return (
    <div className="details-card">
      <div className="dc1">
        <div className="dc11">
          <img
            className="pointer"
            onClick={gotoDetails}
            src={data.cover}
            alt=""
          />
        </div>
        <div className="dc12">
          <div className="title pointer" onClick={gotoDetails}>
            {data.name}
            <Tag color="#f50">{HouseOwnerTypeText[data.ownerType]}</Tag>
          </div>
          <div className="model">
            <Tag color="#2db7f5">{HouseTypeTagText[data.type]}</Tag>
            <Tag>{HouseOwnerTypeText[data.ownerType]}</Tag>
            <Tag>{data.area}㎡</Tag>
            <Tag>{HousePlanText[data.plan]}</Tag>
          </div>
        </div>
        <div className="dc13">￥{data.price}元</div>
      </div>
      <div className="dc2">
        <div className="dc21">
          <img
            src={
              data.userProfile ||
              "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2841648446,236398816&fm=26&gp=0.jpg"
            }
            alt=""
          />
          <span className="name">{data.userNickname}</span>
          <span className="tag">房东</span>
        </div>
        <div className="dc22">
          {formatDate(data.createTime) || "2020-03-06"} 发布
        </div>
      </div>
    </div>
  );
};
