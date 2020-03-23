import { AxiosRequest } from "./BaseApi";

export const upload = file => {
  const data = new FormData();
  data.append("file", file);
  return AxiosRequest.post("/file/upload", data);
};
