import { AxiosRequest } from "./BaseApi";

export const ping = () => {
  return AxiosRequest.get("/user/ping");
};

export const login = params => {
  return AxiosRequest.post("/login", params);
};

export const logout = () => {
  return AxiosRequest.post("/logout");
};

export const getById = id => {
  return AxiosRequest.get(`/user/${id}`);
};

export const getByPage = params => {
  return AxiosRequest.get("/user", { params });
};
