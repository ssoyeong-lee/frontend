import axios, { AxiosResponse } from "axios";

export function TFASetup(): Promise<AxiosResponse<{ otpauthurl: string }>> {
  return axios.post("/auth/2fa/setup", {});
}

export function TFAOn(
  token: string
): Promise<AxiosResponse<{ success: "true" | "false" }>> {
  return axios.post("/auth/2fa/on", { token });
}

export function TFAOff(): Promise<
  AxiosResponse<{ success: "true" | "false" }>
> {
  return axios.post("/auth/2fa/off", {});
}

export function TFALogin(
  token: string
): Promise<AxiosResponse<{ success: "true" | "false" }>> {
  return axios.post("/auth/2fa/login", { token });
}
