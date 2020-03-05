import { AxiosRequest } from "./BaseApi";

export const create = data => {
  return AxiosRequest.post("/house", data);
};

export const getByPage = params => {
  return AxiosRequest.get("/house", { params });
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
