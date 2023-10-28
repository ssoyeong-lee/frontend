import axios from "axios";

const apiUrl = "https://admin.api.hirevisa.com";

const api = axios.create({
  baseURL: apiUrl,
  validateStatus: (status) => {
    return status < 500;
  },
});

export { api };
