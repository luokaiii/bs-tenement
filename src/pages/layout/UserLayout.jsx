import React from "react";
import { Layout, Button } from "antd";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import Settings from "../../system-setting.json";
import { frontRoutes } from "../../routerConfig";

export default () => {
  return (
    <div>
      <Layout className="layout">
        <Layout.Header className="header1">
          <div className="top">
            <div className="left">
              <Link to="/f/home">
                <h2>{Settings.front.name}</h2>
              </Link>
            </div>
            <div className="right">
              <Button type="link" href="/#/b/home">
                进入后台
              </Button>
              <Button href="/#/f/login">登录</Button>
              <Button href="/#/f/registry">注册</Button>
              <Button type="primary" href="/#/f/me">
                个人中心
              </Button>
            </div>
          </div>
        </Layout.Header>
        <Layout.Content className="content1">
          <Switch>
            {frontRoutes.map((v, i) => (
              <Route key={i} path={v.path} component={v.component} exact />
            ))}
            <Redirect to="/f/404" />
          </Switch>
        </Layout.Content>
      </Layout>
    </div>
  );
};
