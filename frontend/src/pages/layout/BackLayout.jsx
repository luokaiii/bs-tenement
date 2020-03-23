import React, { useState, useEffect } from "react";
import { Layout, Menu, Icon, Button } from "antd";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import { ping } from "../../service/UserService";
import { useUser, STORE_CURRENT_USER } from "../../store/index";
import settings from "../../system-setting.json.js";
import { backRoutes } from "../../routerConfig";
import "./BackLayout.less";

const { Item } = Menu;
const { Sider, Content } = Layout;
const { backend } = settings;

export default () => {
  const [isMobile, setIsMobile] = useState(false);
  const { dispatch } = useUser();

  useEffect(() => {
    ping().then(res => {
      dispatch({
        type: STORE_CURRENT_USER,
        payload: {
          user: res.data,
          isLogin: true,
          isAdmin: res.data.role === "ADMIN" ,
          isSuperAdmin: res.data.role === "SUPER_ADMIN"
        }
      });
    });
  }, [dispatch]);
  
  const handleResize = e => {
    if (e.target.defaultView.visualViewport.width <= 768) {
      if (!isMobile) {
        setIsMobile(true);
      }
    } else {
      if (isMobile) {
        setIsMobile(false);
      }
    }
  };
  window.onload = handleResize;

  const MenuRender = ({ menu, mode, defaultOpenKeys }) => {
    return (
      <Menu className="menu" mode={mode} defaultOpenKeys={defaultOpenKeys}>
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
    );
  };

  const HeaderLayout = () => {
    if (isMobile) {
      return (
        <Layout.Header className="header">
          <MenuRender menu={backend.menu} mode="horizontal" />
        </Layout.Header>
      );
    }
    return <React.Fragment />;
  };

  const SiderLayout = () => {
    const { name, menu } = backend;
    if (!isMobile) {
      return (
        <Sider width={200} theme="light" className="sider">
          <div className="logo">{name}</div>
          <MenuRender
            menu={menu}
            mode="inline"
            defaultOpenKeys={menu.defaultOpenKeys}
          />
          <div className="logout">
            <Button href="/#/f/login">退出</Button>
          </div>
        </Sider>
      );
    }
    return <React.Fragment />;
  };

  return (
    <div>
      <Layout className="layout">
        <HeaderLayout />
        <Layout>
          <SiderLayout />
          <Content className="content">
            <Switch>
              {backRoutes.map((v, i) => (
                <Route key={i} path={v.path} component={v.component} exact />
              ))}
              <Redirect to="/b/404" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
