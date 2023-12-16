import { getUserMe } from "@/api/users/index";
import MatchEndModal from "@/components/modal/MatchEndModal";
import MatchFoundModal from "@/components/modal/MatchFoundModal";
import { useAuth } from "@/hooks/data/useAuth";
import { useGame } from "@/hooks/data/useGame";
import { useMessage } from "@/hooks/data/useMessage";
import { useNoti } from "@/hooks/data/useNoti";
import { useModal } from "@/hooks/display/useModal";
import { useSocket } from "@/hooks/useSocket";
import Layout from "@/layouts/Layout";
import {
  receiveCM,
  receiveChannelIn,
  receiveChannelMember,
  receiveChannelOut,
} from "@/socket/channelMessage";
import connectSocket from "@/socket/connectSocket";
import { receiveDM, receiveDMUnreadCount } from "@/socket/directMessage";
import {
  receiveGameInfo,
  receiveGameResult,
  receiveGameStart,
} from "@/socket/game";
import {
  receiveNotification,
  receiveNotificationList,
} from "@/socket/notification";
import "@/styles/globals.css";
import sleep from "@/utils/sleep";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { socket, setSocket } = useSocket();
  const { openModal, closeModal } = useModal();
  const { setAuth } = useAuth();
  const { setGameInfo, setGameStartInfo, setGameSearch } = useGame();
  const {
    setDM,
    setCM,
    setDMUnreadCount,
    increaseDMUnreadCount,
    increaseCMUnreadCount,
  } = useMessage();
  const { setNoti, setNotiList } = useNoti();

  useEffect(() => {
    if (
      router.isReady &&
      !(
        router.pathname === "/login" ||
        router.pathname === "/register" ||
        router.pathname === "/register/form" ||
        router.pathname === "/register/2fa" ||
        router.pathname === "/"
      )
    ) {
      if (socket.connected === undefined) {
        const session = sessionStorage.getItem("session");
        if (session === null) {
          router.push("/login");
          return;
        }
        const socketInstance = connectSocket(session ?? "");
        socketInstance.on("connect", () => {
          console.log("socket connected");
          getUserMe()
            .then((res) => {
              console.log(res.data.nickname + " authed");
              setAuth(res.data);
              receiveNotificationList(socketInstance, setNotiList);
              receiveDM(socketInstance, (data) => {
                setDM(data, res.data.id);
                increaseDMUnreadCount(data.sender.id);
              });
              receiveDMUnreadCount(socketInstance, (data) => {
                for (const key in data) {
                  setDMUnreadCount(data[key].sender.id, data[key].count);
                }
              });
              receiveCM(socketInstance, (data) => {
                setCM(data);
                increaseCMUnreadCount(data.channel.id);
              });
              receiveChannelIn(socketInstance, (data) => {});
              receiveChannelOut(socketInstance, (data) => {});
              receiveChannelMember(socketInstance, (data) => {});
              receiveNotification(socketInstance, setNoti);
              receiveGameStart(socketInstance, (data) => {
                setGameSearch({
                  isSearching: false,
                  mode: "standard",
                });
                setGameStartInfo(data);
                openModal(<MatchFoundModal info={data} />, true);
                sleep(3000).then(() => {
                  closeModal();
                  router.push(`/game`);
                });
              });
              receiveGameResult(socketInstance, (data) => {
                openModal(
                  <MatchEndModal
                    info={data}
                    onClick={() => {
                      closeModal();
                      router.push(`/main`);
                    }}
                  />,
                  true
                );
              });
              receiveGameInfo(socketInstance, (data) => {
                setGameInfo(data);
              });
              console.log("set receive func finished");
            })
            .catch((err) => {
              console.error("auth failed");
              console.error(err);
            });
        });
        socketInstance.on("disconnect", () => {
          console.log("socket disconnected");
          toast.error("서버와의 연결이 끊어졌습니다.");
          router.push("/login");
        });

        setSocket(socketInstance);
      }
    }
  }, [router]);
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}
