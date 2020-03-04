import React from "react";

import "./DetailsCard.less";
import { Icon } from "antd";

export default () => {
  const gotoDetails = () => {
    window.location.href = `/#/f/details/1`;
  };

  return (
    <div className="details-card">
      <div className="dc1">
        <div className="dc11">
          <img
            className="pointer"
            onClick={gotoDetails}
            src="http://cdn.baletoo.cn/Uploads/housephoto/2958/2957860/oss_5dd77093bdfb5.png@!380_280.png"
            alt=""
          />
        </div>
        <div className="dc12">
          <div className="title pointer" onClick={gotoDetails}>
            绿泉公寓-静安 近地铁 可做饭 新上架 电梯房 智能电表
          </div>
          <div className="model">
            <Icon type="home" />
            &nbsp; 合租|朝北-次卧|13㎡
          </div>
        </div>
        <div className="dc13">￥300000</div>
      </div>
      <div className="dc2">
        <div className="dc21">
          <img
            src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2841648446,236398816&fm=26&gp=0.jpg"
            alt=""
          />
          <span className="name">孙先生</span>
          <span className="tag">房东</span>
        </div>
        <div className="dc22">2020-03-04 发布</div>
      </div>
    </div>
  );
};
