import React from "react";
import "./GoodsCard.less";

export default ({ data }) => {
  return (
    <div className="goods-card">
      <div className="card" onClick={() => window.location.href="/#/f/details/1"}>
        <div className="top">
          <img src="" alt="" />
        </div>
        <div className="bottom">
          <div className="price">
            <div className="name">名称</div>
            <div className="price">300000元</div>
          </div>
          <div className="desc">
            上海-宝山-淞南|朝东南|75㎡111111111111111111111111111
          </div>
        </div>
      </div>
    </div>
  );
};
