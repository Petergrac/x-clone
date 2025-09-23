"use client";
import { followActions } from "@/app/_actions/userQueries";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
interface followerType {
  username: string;
  name: string;
  avatar: string | null;
}

const Followers = ({
  user,
  isFollowing,
}: {
  user: followerType;
  isFollowing: boolean;
}) => {
  const handleFollow = async (username: string) => {
    try {
      await followActions(username);
      if (isFollowing) toast.warning(`You are have unfollowed ${username}`);
      else toast.info(`You are now following ${username}`);
    } catch (error) {
      toast.error("Can't follow the user");
    }
  };
  return (
    <div className="flex justify-between items-center cursor-pointer">
      <div className="mt-3 flex items-center gap-2">
        {/* AVATAR */}
        <Avatar>
          <AvatarImage
            width={30}
            src={user.avatar || "https://github.com/shadcn.png"}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* USER-DETAILS */}
        <div className="flex justify-start flex-col items-start">
          <h3 className="font-bold">{user.name}</h3>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>
      </div>
      <button
        onClick={() => handleFollow(user.username)}
        className="text-black bg-white/95 font-bold rounded-full h-fit py-2 px-3"
      >
        {isFollowing ? "Unfollow" : "Follow back"}
      </button>
    </div>
  );
};

export default Followers;
