import { AxiosRequest } from "./BaseApi";

export const login = params => {
  return AxiosRequest.post("/login", params);
};

export const logout = () => {
  return AxiosRequest.post("/logout");
};

export const getById = id => {
  return AxiosRequest.get(`/admin/${id}`);
};

export const getByPage = params => {
  return AxiosRequest.get("/admin", { params });
};

export const create = data => {
  return AxiosRequest.post("/admin", data);
};
