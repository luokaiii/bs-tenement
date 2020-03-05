import { AxiosRequest } from "./BaseApi";

export const create = data => {
  return AxiosRequest.post("/house", data);
};
