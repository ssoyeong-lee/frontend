import axios from "axios";

const apiUrl =
  "http://ec2-54-180-101-88.ap-northeast-2.compute.amazonaws.com:3000";

const api = axios.create({
  baseURL: apiUrl,
  validateStatus: (status) => {
    return status < 500;
  },
});

export { api };
