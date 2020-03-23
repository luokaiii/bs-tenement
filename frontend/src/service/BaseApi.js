import axios from "axios";
import { notification, message } from "antd";

const url = "/api/";
export const AxiosRequest = axios.create({
  baseURL: url
});

AxiosRequest.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { response } = error;
    if (response.status === 401) {
      window.location.href = "/#/f/login";
    } else if (response.status === 403) {
      notification.warning({
        message: "没有权限！",
        description: "您没有权限做此操作"
      });
    } else if (response.status === 500) {
      message.error("操作失败，请重试");
    } else {
      message.error(response.data.message);
    }
    return Promise.reject(error);
  }
);
