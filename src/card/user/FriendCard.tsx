import { Friend } from "@/api/users/friend";
import FriendItem from "@/components/user/FriendItem";
import FriendRequestItem from "@/components/user/FriendRequestItem";
import PendingApprovalItem from "@/components/user/PendingApprovalItem";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";

interface Props {
  friendList: Friend[];
  setFriendList: (friendList: Friend[]) => void;
}

export default function FriendCard({ friendList }: Props) {
  return (
    <Card>
      <FlexBox className="h-full gap-8 text-xl" direction="col">
        <div>Friends</div>
        {friendList.map((friend, idx) => {
          console.log(friend);
          let item = <></>;
          switch (friend.status) {
            case "friend":
              item = <FriendItem friend={friend} key={idx} />;
              break;
            case "pendingApproval":
              item = <PendingApprovalItem friend={friend} key={idx} />;
              break;
            case "friendRequest":
              item = <FriendRequestItem friend={friend} key={idx} />;
              break;
          }
          return item;
        })}
      </FlexBox>
    </Card>
  );
}
