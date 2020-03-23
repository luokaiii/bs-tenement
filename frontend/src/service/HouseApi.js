import { AxiosRequest } from "./BaseApi";

export const create = data => {
  return AxiosRequest.post("/house", data);
};

export const getByPage = params => {
  return AxiosRequest.get("/house", { params });
};

export const getByName = (name, params) => {
  return AxiosRequest.get(`/house/name/${name}`, { params });
};

export const getById = id => {
  return AxiosRequest.get(`/house/${id}`);
};

export const updateStatus = (id, status) => {
  return AxiosRequest.put(`/house/${id}/status/${status}`);
};

export const like = id => {
  return AxiosRequest.post(`/house/${id}/like`);
};

export const update = (id, data) => {
  return AxiosRequest.put(`/house/${id}`, data);
};
