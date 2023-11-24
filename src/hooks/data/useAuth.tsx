import { UserDetail } from "@/api/users/index";
import { atom, useAtom } from "jotai";

const authAtom = atom<UserDetail | null>(null);

interface UseAuthType {
  auth: UserDetail | null;
  setAuth: (auth: UserDetail | null) => void;
}

function useAuth(): UseAuthType {
  const [auth, setAuth] = useAtom(authAtom);
  return { auth, setAuth };
}

export { useAuth };
