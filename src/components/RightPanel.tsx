import { SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import prisma from "@/lib/prisma";

const RightPanel = async () => {
  const followers = await prisma.follow.findMany({
    where: {
      following: {
        username: "ena25", // target user
      },
    },
    select: {
      follower: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
  return (
    <div className="w-[clamp(290px,25vw,350px)] ml-6 lg:flex flex-col gap-3 h-fit hidden">
      {/* SEARCH BAR */}
      <div className="flex items-center p-3 gap-2 rounded-full anim border flex-1 mt-2  hover:border-sky-400 hover:border-1">
        <SearchIcon color="gray" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none"
        />
      </div>
      {/* Today news */}
      <div className="border rounded-lg">
        <h1 className="text-2xl font-bold mb-6 px-4 py-2">Today&apos;s News</h1>

        {/* ARRAY OF NEWS */}
        <div className="hover:bg-gray-800 px-4 py-2">
          {/* News content */}
          <p className="h-12 font-bold overflow-hidden mb-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos enim
            suscipit magni exercitationem odio perspiciatis explicabo cumque,
            vel nihil molestias laudantium repellendus fugit, aliquam dolores
            rerum, quo voluptate vero minus?
          </p>
          {/* AUTHORS */}
          <div className="flex items-center">
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/leerob.png"
                  alt="@leerob"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
            {/* TIME SLIP, CATEGORY & LIKES*/}
            <div className="text-muted-foreground text-sm flex items-center gap-[2px]">
              <p className="">12 hours ago</p>
              <span>&middot;</span>
              <p>Sports</p>
              <span>&middot;</span>
              <p>19.4k posts</p>
            </div>
          </div>
        </div>
      </div>
      {/* WHO TO FOLLOW */}
      <div className="border rounded-lg p-4">
        <h1 className="text-2xl font-bold">Who to follow</h1>
        {/* Followers */}
        {/* USE MAP HERE */}
        {followers &&
          followers.map((user) => (
            <div
              className="flex justify-between items-center cursor-pointer"
              key={user.follower.id}
            >
              <div className="mt-3 flex items-center gap-2">
                {/* AVATAR */}
                <Avatar>
                  <AvatarImage
                    width={30}
                    src={user.follower.avatar || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {/* USER-DETAILS */}
                <div className="flex justify-start flex-col items-start">
                  <h3 className="font-bold">{user.follower.name}</h3>
                  <p className="text-muted-foreground">@{user.follower.username}</p>
                </div>
              </div>
              <button className="text-black bg-white/95 font-bold rounded-full h-fit py-2 px-3">
                Follow
              </button>
            </div>
          ))}
        {/*  */}
      </div>
    </div>
  );
};

export default RightPanel;
