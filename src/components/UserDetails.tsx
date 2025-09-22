import { Calendar1Icon } from "lucide-react";
import Image from "./Image";
import ProfileDialog from "./ProfileDialog";

type userType = {
  userDetails: {
    username: string | undefined;
    name: string;
    banner: string | null | undefined;
    avatar: string | null | undefined;
    createdAt: Date | undefined;
    followers: number | undefined;
    bio: string | null | undefined;
    following: number | undefined;
  };
};

const UserDetails = ({ userDetails }: userType) => {
  return (
    <div>
      {/* BANNER */}
      <div className="relative">
        <div className="overflow-hidden relative mt-3 w-full">
          <Image
            src={userDetails.banner || "/general/banner.jpeg"}
            alt=""
            width={600}
            height={200}
          />
        </div>
        {/* USER AVATAR */}
        <div className="object-center absolute left-4 -bottom-[72px] border-5 border-black aspect-square overflow-hidden rounded-full">
          <Image
            src={userDetails.avatar || "/general/profile.jpg"}
            alt=""
            width={133}
            height={133}
          />
        </div>
      </div>
      {/* EDIT BUTTON OR SUBSCRIBE */}
      <div className="flex justify-end w-full">
        <ProfileDialog username={userDetails.username} />
      </div>

      {/* User Details */}
      <div className="flex flex-col gap-4 mt-5 ml-4">
        {/* USERNAME & TWEET HANDLE */}
        <div className="flex flex-col justify-start">
          <p className="font-bold text-2xl">{userDetails.name || "ℕΣΜΣЅℐЅ"}</p>
          <p className="text-sm text-muted-foreground">
            @{userDetails.username}
          </p>
        </div>
        {/* BIO & DATE */}
        <div className="">
          <p className="h-10 overflow-clip">{userDetails.bio}</p>
          <div className="text-gray-500 flex items-center gap-2">
            <Calendar1Icon className="text-gray-500" />
            <p>
              Joined{" "}
              {userDetails.createdAt?.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        {/* FOLLOWERS & FOLLOWING */}
        <div className="flex items-center gap-3">
          {/* Following */}
          <p className="text-gray-500 ">
            <span className="font-bold text-white">
              {userDetails.following}
            </span>{" "}
            Following
          </p>
          {/* Followers */}
          <p className="text-gray-500 ">
            <span className="font-bold text-white">
              {userDetails.followers}
            </span>{" "}
            Followers
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
