import { Friend } from "@/api/users/friend";
import FriendItem from "@/components/user/FriendItem";
import FriendRequestItem from "@/components/user/FriendRequestItem";
import PendingApprovalItem from "@/components/user/PendingApprovalItem";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";
import ScrollBox from "@/layouts/ScrollBox";

interface Props {
  friendList: Friend[];
  setFriendList: (friendList: Friend[]) => void;
}

export default function FriendCard({ friendList }: Props) {
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
        </ScrollBox>
      </FlexBox>
    </Card>
  );
}
