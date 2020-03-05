import FHome from "./pages/frontend/home";
import FList from "./pages/frontend/list";
import FPublish from "./pages/frontend/publish";
import FDetail from "./pages/frontend/detail";
import FLogin from "./pages/frontend/login";
import FRegistry from "./pages/frontend/registry";
import FMe from "./pages/frontend/me";
import F404 from "./pages/frontend/404";

import BHome from "./pages/backend/home";
import BUser from "./pages/backend/user";
import BHouseList from "./pages/backend/house/list";
import BAdmin from "./pages/backend/admin";
import B404 from "./pages/backend/404";

// 前台页面
export const frontRoutes = [
  {
    path: "/f/home",
    component: FHome
  },
  {
    path: "/f/list/:type",
    component: FList
  },
  {
    path: "/f/details/:id",
    component: FDetail
  },
  {
    path: "/f/publish/:type",
    component: FPublish
  },
  {
    path: "/f/login",
    component: FLogin
  },
  {
    path: "/f/registry",
    component: FRegistry
  },
  {
    path: "/f/me",
    component: FMe
  },
  {
    path: "/f/404",
    component: F404
  }
];

// 后台页面
export const backRoutes = [
  {
    path: "/b/home",
    component: BHome
  },
  {
    path: "/b/user",
    component: BUser
  },
  {
    path: "/b/house/:type/:status",
    component: BHouseList
  },
  {
    path: "/b/system/admin/list",
    component: BAdmin
  },
  {
    path: "/b/404",
    component: B404
  }
];
