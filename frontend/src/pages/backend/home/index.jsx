import React from "react";
import { Descriptions, Badge } from "antd";

export default () => {
  return (
    <Descriptions title="二手房中介管理平台" bordered>
      <Descriptions.Item label="项目名称" span={3}>
        二手房中介管理平台
      </Descriptions.Item>
      <Descriptions.Item label="后端语言">JAVA</Descriptions.Item>
      <Descriptions.Item label="JDK版本">1.8</Descriptions.Item>
      <Descriptions.Item label="官网">
        <a
          href="https://www.oracle.com/java/technologies/javase-jdk8-downloads.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          官方网站
        </a>
      </Descriptions.Item>
      <Descriptions.Item label="前端语言">React</Descriptions.Item>
      <Descriptions.Item label="React版本">16.8</Descriptions.Item>
      <Descriptions.Item label="官网">
        <a
          href="https://zh-hans.reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          官方网站
        </a>
      </Descriptions.Item>
      <Descriptions.Item label="界面UI">Ant Design</Descriptions.Item>
      <Descriptions.Item label="antd版本">3.24.3</Descriptions.Item>
      <Descriptions.Item label="官网">
        <a
          href="https://3x.ant.design/docs/react/introduce-cn"
          target="_blank"
          rel="noopener noreferrer"
        >
          官方网站
        </a>
      </Descriptions.Item>
      <Descriptions.Item label="数据库">H2</Descriptions.Item>
      <Descriptions.Item label="H2版本">1.4.199</Descriptions.Item>
      <Descriptions.Item label="官网">
        <a
          href="https://www.h2database.com/html/main.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          官方网站
        </a>
      </Descriptions.Item>
      <Descriptions.Item label="项目状态" span={3}>
        <Badge status="processing" text="运行中" />
      </Descriptions.Item>
      <Descriptions.Item label="项目介绍" span={3}>
        二手房中介平台的设计与实现的设计目标是立足于开发套简单易用、方便快捷和功能强大的信息管理系统。
        <br />
        用户可以通过系统的出售模块和需求模块，将自己的房屋信息录入系统数据库中。
        <br />
        用户也可以通过系统的查询功能查找自己需要的房源信息。
        <br />
      </Descriptions.Item>
      <Descriptions.Item label="项目描述" span={3}>
        本系统主要功能模块主要分为用户和管理员功能模块：
        <br />
        1、用户登录、注册功能。（用户需要注册才能发布发布房源等操作）
        <br />
        2、用户查询：查询房源信息，查询出售出租信息。
        <br />
        3、用户发布房源信息：其中房源信息包括出租房、出售房、求租房、求售房。
        <br />
        4、用户修改房源信息。
        <br />
      </Descriptions.Item>
    </Descriptions>
  );
};
