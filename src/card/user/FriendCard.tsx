import {
  Friend,
  approveFriend,
  deleteFriend,
  denyFriend,
} from "@/api/users/friend";
import FriendItem from "@/components/user/FriendItem";
import FriendRequestItem from "@/components/user/FriendRequestItem";
import PendingApprovalItem from "@/components/user/PendingApprovalItem";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface Props {
  friendList: Friend[];
  setFriendList: (friendList: Friend[]) => void;
}

export default function FriendCard({ friendList, setFriendList }: Props) {
  const onClickDelete = async (id: number) => {
    try {
      await deleteFriend(id);
      setFriendList(friendList.filter((friend) => friend.otherUser.id !== id));
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (typeof axiosError.response?.data.message === "object")
        toast.error(axiosError.response?.data.message[0]);
      else toast.error(axiosError.response?.data.message);
    }
  };
  const onClickApprove = async (id: number) => {
    try {
      await approveFriend(id);
      setFriendList(
        friendList.map((friend) => {
          if (friend.otherUser.id === id) friend.status = "friend";
          return friend;
        })
      );
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (typeof axiosError.response?.data.message === "object")
        toast.error(axiosError.response?.data.message[0]);
      else toast.error(axiosError.response?.data.message);
    }
  };
  const onClickDeny = async (id: number) => {
    try {
      await denyFriend(id);
      setFriendList(friendList.filter((friend) => friend.otherUser.id !== id));
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (typeof axiosError.response?.data.message === "object")
        toast.error(axiosError.response?.data.message[0]);
      else toast.error(axiosError.response?.data.message);
    }
  };

  return (
    <Card>
      <FlexBox className="h-full text-xl gap-8" direction="col">
        <div>Friends</div>
        <ScrollBox>
          <FlexBox className="gap-8" direction="col">
            {friendList.map((friend, idx) => {
              let item = <></>;
              switch (friend.status) {
                case "friend":
                  item = (
                    <FriendItem
                      friend={friend}
                      key={idx}
                      onClickDelete={onClickDelete}
                    />
                  );
                  break;
                case "pendingApproval":
                  item = (
                    <PendingApprovalItem
                      friend={friend}
                      key={idx}
                      onClickApprove={onClickApprove}
                      onClickDeny={onClickDeny}
                    />
                  );
                  break;
                case "friendRequest":
                  item = <FriendRequestItem friend={friend} key={idx} />;
                  break;
              }
              return item;
            })}
          </FlexBox>
        </ScrollBox>
      </FlexBox>
    </Card>
  );
}
