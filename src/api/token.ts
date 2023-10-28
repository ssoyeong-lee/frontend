import { AxiosInstance } from "axios";
import jwt_decode from "jwt-decode";

interface Token {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

const refresh = async (
  client: AxiosInstance,
  accessToken: string,
  refreshToken: string
) => {
  try {
    const res = await client.post(
      "/refresh",
      "have to implement refresh token"
    );
    if (res.status !== 200) {
      throw new Error("Refresh token failed");
    }
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    return res.data.accessToken as string;
  } catch (error) {
    console.log("logout");
    localStorage.removeItem("auth");
    location.reload();
    return "";
  }
};

const getAuth = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!accessToken || !refreshToken) {
    throw new Error("No accessToken or refreshToken in localStorage");
  }
  return { accessToken, refreshToken };
};

const clientSetToken = (client: AxiosInstance) => {
  client.interceptors.request.use(
    async function (config) {
      try {
        if (typeof document !== "undefined") {
          let { accessToken, refreshToken } = getAuth();
          const decodedAccessToken = jwt_decode<Token>(accessToken);
          if (Date.now() >= decodedAccessToken.exp * 1000) {
            console.log("AccessToken expired");
            accessToken = await refresh(client, accessToken, refreshToken);
          }
          config.headers.set("access_token", accessToken);
        }
      } catch (err) {
        console.log(err);
      }
      return config;
    },
    function (error) {
      console.log(error);
      return Promise.reject(error);
    }
  );
};

export { clientSetToken };
