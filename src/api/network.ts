import axios from "axios";

const apiUrl =
  "https://ec2-15-164-74-198.ap-northeast-2.compute.amazonaws.com:3000";

const api = axios.create({
  baseURL: apiUrl,
  validateStatus: (status) => {
    return status < 400;
  },
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//clientSetToken(api);

export { api, apiUrl };
