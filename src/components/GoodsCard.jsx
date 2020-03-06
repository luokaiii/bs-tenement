import React from "react";
import "./GoodsCard.less";

export default ({ data }) => {
  return (
    <div className="goods-card">
      <div
        className="card"
        onClick={() => (window.location.href = "/#/f/details/1")}
      >
        <div className="top">
          <img src={data.cover} alt="" />
        </div>
        <div className="bottom">
          <div className="price">
            <div className="name">{data.name}</div>
            <div className="price">{data.price}元</div>
          </div>
          <div className="desc">
            {`${data.province}-${data.city} ${data.estate}`}
          </div>
        </div>
      </div>
    </div>
  );
};
