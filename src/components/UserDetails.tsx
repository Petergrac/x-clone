import { Calendar1Icon } from "lucide-react";
import Image from "next/image";
import ProfileDialog from "./ProfileDialog";

const UserDetails = () => {
  return (
    <div>
      {/* BANNER */}
      <div className="relative">
        <div className="aspect-[6/2] overflow-hidden relative mt-3 w-full">
          <Image
            className="object-center"
            src="/general/banner.jpeg"
            alt=""
            fill
          />
        </div>
        {/* USER AVATAR */}
        <Image
          className="object-center absolute left-4 -bottom-[72px] border-5 border-black aspect-square rounded-full"
          src="/general/profile.jpg"
          alt=""
          width={133}
          height={133}
        />
      </div>
      {/* EDIT BUTTON OR SUBSCRIBE */}
      <div className="flex justify-end w-full">
          <ProfileDialog />
      </div>

      {/* User Details */}
      <div className="flex flex-col gap-4 mt-5 ml-4">
        {/* USERNAME & TWEET HANDLE */}
        <div className="flex flex-col justify-start">
          <p className="font-bold text-2xl">ℕΣΜΣЅℐЅ</p>
          <p className="text-sm text-muted-foreground">@nemesis</p>
        </div>
        {/* BIO & DATE */}
        <div className="">
          <p className="h-10 overflow-clip">Lorem ipsum dolor.</p>
          <div className="text-gray-500 flex items-center gap-2">
            <Calendar1Icon className="text-gray-500" />
            <p>Joined August 2022</p>
          </div>
        </div>
        {/* FOLLOWERS & FOLLOWING */}
        <div className="flex items-center gap-3">
          {/* Following */}
          <p className="text-gray-500 ">
            <span className="font-bold text-white">121</span> Following
          </p>
          {/* Followers */}
          <p className="text-gray-500 ">
            <span className="font-bold text-white">11</span> Followers
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
