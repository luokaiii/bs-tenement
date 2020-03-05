import React from "react";
import { Carousel, Input, Icon } from "antd";

import GoodsCard from "../../../components/GoodsCard";
import tuzi from "../../../static/tuzi2018.png";
import "./index.less";

export default () => {
  const D2Render = () => {
    const values = [
      {
        icon: "border-left",
        name: "二手房",
        target: "/#/f/list/sell"
      },
      {
        icon: "border-top",
        name: "出租房",
        target: "/#/f/list/rent"
      },
      {
        icon: "border-bottom",
        name: "出售报价",
        target: "/#/f/publish/SELL"
      },
      {
        icon: "border-right",
        name: "出租报价",
        target: "/#/f/publish/RENT"
      }
    ];
    const gotoList = t => {
      window.location.href = t;
    };
    return (
      <div className="d2">
        {values.map((v, i) => (
          <div className="d21" key={i} onClick={() => gotoList(v.target)}>
            <Icon type={v.icon} className="icon" />
            <div>{v.name}</div>
          </div>
        ))}
      </div>
    );
  };

  const D3Render = ({ name }) => {
    const gotoList = () => {
      window.location.href = "/#/f/list/all";
    };
    return (
      <div className="d3">
        <div className="more">
          <div className="pointer" onClick={gotoList}>
            <img src={tuzi} alt="tuzi" />
            {name}
          </div>
          <div className="pointer" onClick={gotoList}>
            More >>
          </div>
        </div>
        <div className="list">
          <GoodsCard data={{ name: "内容1" }} />
          <GoodsCard data={{ name: "内容2" }} />
          <GoodsCard data={{ name: "内容3" }} />
          <GoodsCard data={{ name: "内容4" }} />
        </div>
      </div>
    );
  };

  return (
    <div className="home">
      <div className="d1">
        <Carousel autoplay className="carousel">
          <div>
            <img
              src="http://cdn.baletoo.cn/Uploads/bnanerImageUrl/1/148/oss_5c19e5a1063ea.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              src="http://cdn.baletoo.cn/Uploads/bnanerImageUrl/1/110/oss_5a6a8dcf34af5.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="http://cdn.baletoo.cn/Uploads/bnanerImageUrl/1/67/oss_5a6a8dbe1086f.png"
              alt=""
            />
          </div>
        </Carousel>
        <div className="d11">
          <Input.Search
            placeholder="输入地区、地铁、小区名进行搜索"
            className="search"
          />
        </div>
      </div>
      <D2Render />
      <D3Render name="精选二手房" />
      <D3Render name="精选整租房" />
      <D3Render name="精选合租房" />
      <div className="d3">底部logo</div>
    </div>
  );
};
