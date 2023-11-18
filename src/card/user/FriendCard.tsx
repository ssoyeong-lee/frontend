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

interface Props {
  friendList: Friend[];
  setFriendList: (friendList: Friend[]) => void;
}

export default function FriendCard({ friendList, setFriendList }: Props) {
  const onClickDelete = async (id: number) => {
    await deleteFriend(id);
    setFriendList(friendList.filter((friend) => friend.otherUserId !== id));
  };
  const onClickApprove = async (id: number) => {
    await approveFriend(id);
    setFriendList(
      friendList.map((friend) => {
        if (friend.otherUserId === id) friend.status = "friend";
        return friend;
      })
    );
  };
  const onClickDeny = async (id: number) => {
    await denyFriend(id);
    setFriendList(friendList.filter((friend) => friend.otherUserId !== id));
  };

  return (
    <Card>
      <FlexBox className="h-full text-xl gap-8" direction="col">
        <div>Friends</div>
        <ScrollBox>
          <FlexBox className="gap-8" direction="col">
            {friendList.map((friend, idx) => {
              console.log(friend);
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
