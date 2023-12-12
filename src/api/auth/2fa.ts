import axios, { AxiosResponse } from "axios";

export function TFASetup(): Promise<AxiosResponse<{ qrimgurl: string }>> {
  return axios.post("/api/auth/2fa/setup", {});
}

export function TFAOn(
  token: string
): Promise<AxiosResponse<{ success: boolean }>> {
  return axios.post("/api/auth/2fa/on", { token });
}

export function TFAOff(): Promise<AxiosResponse<{ success: boolean }>> {
  return axios.post("/api/auth/2fa/off", {});
}

export function TFALogin(
  token: string
): Promise<AxiosResponse<{ session?: string; success: boolean }>> {
  return axios.post("/api/auth/2fa/login", { token });
}
