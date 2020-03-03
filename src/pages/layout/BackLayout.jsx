import React from "react";
import { Layout, Menu, Icon, Button } from "antd";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import settings from "../../system-setting.json";
import { backRoutes } from "../../routerConfig";
import "./BackLayout.less";

const { Item } = Menu;
const { Sider, Content } = Layout;
const { backend } = settings;
const { name, menu } = backend;

export default () => {
  return (
    <div>
      <Layout className="layout">
        <Sider width={200} theme="light" className="sider">
          <div className="logo">{name}</div>
          <Menu
            className="menu"
            mode={menu.mode}
            defaultOpenKeys={menu.defaultOpenKeys}
          >
            {menu.items.map(v => {
              if (v.items) {
                return (
                  <Menu.SubMenu
                    key={v.path}
                    title={
                      <span>
                        {v.icon && <Icon type={v.icon} />}
                        <span>{v.name}</span>
                      </span>
                    }
                  >
                    {v.items.map(d => (
                      <Item key={d.path}>
                        <Link to={d.path}>{d.name}</Link>
                      </Item>
                    ))}
                  </Menu.SubMenu>
                );
              } else {
                return (
                  <Item key={v.path}>
                    <Link to={v.path}>
                      {v.icon && <Icon type={v.icon} />}
                      {v.name}
                    </Link>
                  </Item>
                );
              }
            })}
          </Menu>
          <div className="logout">
            <Button href="/#/f/login">退出</Button>
          </div>
        </Sider>
        <Content className="content">
          <Switch>
            {backRoutes.map((v, i) => (
              <Route key={i} path={v.path} component={v.component} exact />
            ))}
            <Redirect to="/b/404" />
          </Switch>
        </Content>
      </Layout>
    </div>
  );
};
