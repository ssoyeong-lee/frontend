import { api } from "@/api/network";
import { AxiosError, AxiosRequestConfig } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path } = req.query;
  console.log(req.query);
  let url = "/";
  if (typeof path === "object") url += path.join("/");
  else url += path || "";

  let isHasExtraQuery = false;
  for (let keys in req.query) {
    if (keys !== "path") {
      if (!isHasExtraQuery) {
        url += "?";
        isHasExtraQuery = true;
      } else url += "&";
      url += `${keys}=${req.query[keys]}`;
    }
  }

  try {
    const requestToServer: AxiosRequestConfig = {
      url: url,
      method: req.method as any,
      headers: {
        Cookie: req.headers.cookie,
      },
    };
    if (req.method === "POST" || req.method === "PUT") {
      requestToServer.data = req.body;
    }
    const axiosRes = await api.request(requestToServer);
    res
      .status(200)
      .setHeader("Set-Cookie", axiosRes.headers["set-cookie"] as string[])
      .json(axiosRes.data);
  } catch (error) {
    //console.log(error);
    const axiosError = error as AxiosError;
    res
      .status(axiosError.response?.status || 500)
      .json(axiosError.response?.data);
  }
}
