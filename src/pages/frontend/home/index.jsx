import React, { useEffect, useState } from "react";
import { Carousel, Input, Icon } from "antd";

import { getByPage } from "../../../service/HouseApi";
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
        target: "/?#/f/publish/SELL"
      },
      {
        icon: "border-right",
        name: "出租报价",
        target: "/?#/f/publish/RENT"
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

  const D3Render = ({ name, type, ownerType }) => {
    const [data, setData] = useState([]);
    const gotoList = () => {
      window.location.href = "/#/f/list/all";
    };
    useEffect(() => {
      getByPage({
        page: 0,
        size: 4,
        sort: "id,desc",
        type,
        ownerType,
        status: "ADDED"
      }).then(res => {
        setData(res.data.content);
      });
    }, [type, ownerType]);

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
          {data.map((v, i) => (
            <GoodsCard data={v} key={i} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="home">
      <div className="d1">
        <Carousel autoplay autoplaySpeed={5000} className="carousel">
          <div>
            <img
              src="http://cdn.baletoo.cn/Uploads/bnanerImageUrl/1/67/oss_5a6a8dbe1086f.png"
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
              src="http://cdn.baletoo.cn/Uploads/bnanerImageUrl/1/148/oss_5c19e5a1063ea.jpg"
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
      <D3Render name="精选二手房" type="SELL" />
      <D3Render name="精选整租房" type="RENT" ownerType="ALL" />
      <D3Render name="精选合租房" type="RENT" ownerType="PART" />
      <D3Render name="精选公寓" type="RENT" ownerType="APART" />
    </div>
  );
};
