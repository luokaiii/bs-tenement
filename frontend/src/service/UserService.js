import { AxiosRequest } from "./BaseApi";

export const ping = () => {
  return AxiosRequest.get("/user/ping");
};

export const login = (username, password) => {
  const data = new FormData();
  data.append("username", username);
  data.append("password", password);
  return AxiosRequest.post("/login", data);
};

export const update = (id, data) => {
  return AxiosRequest.put(`/user/${id}`, data);
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

export const updateDisabled = (id, disabled) => {
  return AxiosRequest.put(`/user/${id}/disabled?disabled=${disabled}`);
};

export const registry = data => {
  return AxiosRequest.post("/user/registry", data);
};

export const updatePassword = (username, phone, password) => {
  return AxiosRequest.put(
    `/user/reset?username=${username}&phone=${phone}&password=${password}`
  );
};
