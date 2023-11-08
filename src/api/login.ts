import axios, { AxiosResponse } from "axios";

export function login(uri: string): Promise<AxiosResponse<{ data: string }>> {
  return axios.get(`/api/auth/sign-in?callback_uri=${uri}`);
}

export function userRedirect(
  code: string,
  state: string
): Promise<AxiosResponse<{ redirect: "home" | "register" }>> {
  return axios.get(`/api/auth/user-redirect?code=${code}&state=${state}`);
}

export function register(nickname: string): Promise<AxiosResponse> {
  return axios.post("/api/auth/register", { nickname });
}
