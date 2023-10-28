import { useContext, createContext, useEffect, useState } from "react";

interface AuthContextType {
  username: string;
  accesstoken: string;
  refreshToken: string;
}

const AuthInit = {
  username: "",
  accesstoken: "",
  refreshToken: "",
};

const AuthContext = createContext<AuthContextType>(AuthInit);

function AuthFromLocalStorage(): AuthContextType {
  const username = localStorage.getItem("username") || "";
  const accesstoken = localStorage.getItem("accesstoken") || "";
  const refreshToken = localStorage.getItem("refreshToken") || "";

  return { username, accesstoken, refreshToken };
}

function AuthProvider({ children }: { children: JSX.Element }) {
  const [auth, setAuth] = useState<AuthContextType>(AuthInit);
  useEffect(() => {
    setAuth(AuthFromLocalStorage());
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return auth;
}

export { AuthProvider, useAuth };
