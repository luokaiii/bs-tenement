import React, { useEffect } from "react";
import { Layout, Button } from "antd";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import { ping, logout } from "../../service/UserService";
import {
  useUser,
  STORE_CURRENT_USER,
  REMOVE_CURRENT_USER
} from "../../store/index";
import Settings from "../../system-setting.json.js";
import { frontRoutes } from "../../routerConfig";

export default () => {
  const { state, dispatch } = useUser();
  const { isLogin, isAdmin, isSuperAdmin } = state;

  const quit = () => {
    logout().then(() => {
      dispatch({
        type: REMOVE_CURRENT_USER
      });
    });
  };

  useEffect(() => {
    ping().then(res => {
      dispatch({
        type: STORE_CURRENT_USER,
        payload: {
          user: res.data,
          isLogin: true,
          isAdmin: res.data.role === "ADMIN",
          isSuperAdmin: res.data.role === "SUPER_ADMIN"
        }
      });
    });
  }, [dispatch]);

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
              {(isAdmin || isSuperAdmin) && (
                <Button type="link" href="/#/b/home">
                  进入后台
                </Button>
              )}
              {isLogin ? (
                <>
                  <Button type="primary" href="/#/f/me">
                    个人中心
                  </Button>
                  <Button onClick={quit}>登出</Button>
                </>
              ) : (
                <>
                  <Button href="/#/f/login">登录</Button>
                  <Button href="/#/f/registry">注册</Button>
                </>
              )}
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
