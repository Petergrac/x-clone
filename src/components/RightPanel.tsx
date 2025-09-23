import { SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Followers from "./Followers";

const RightPanel = async () => {
  const { userId } = await auth();
  if (!userId) {
    return "You must be authenticated";
  }
  const followers = await prisma.follow.findMany({
    where: {
      following: {
        clerkId: userId, // They are following me
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

  const following = await prisma.follow.findMany({
    where: {
      follower: {
        clerkId: userId, // I follow them
      },
    },
    select: {
      following: {
        select: {
          id: true,
          username: true,
          avatar: true,
          name: true,
        },
      },
    },
  });

  // Get the IDs of users I follow
  const followingIds = new Set(following.map((f) => f.following.id));
  // Filter followers to get only the ones I don't follow back
  const notFollowedBack = followers
    .filter((f) => !followingIds.has(f.follower.id))
    .map((f) => f.follower);

  return (
    <div className="w-[clamp(290px,25vw,350px)] ml-6 lg:flex flex-col gap-3 h-fit hidden sticky z-40 top-0">
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
        <h1 className="text-2xl font-bold">Your Followers</h1>
        {/* Followers */}
        {/* USE MAP HERE */}
        {notFollowedBack.length > 0 ? (
          notFollowedBack.map((user) => <Followers key={user.id} user={user} isFollowing={false} />)
        ) : (
          <div className="w-full">
            <p className="text-center py-5 text-sm text-gray-400">
              You have no followers
            </p>
          </div>
        )}
        {/*  */}
      </div>
      {/* THOSE THAT I FOLLOW */}
      <div className="border rounded-lg p-4">
        <h1 className="text-2xl font-bold">Those that you follow</h1>
        {/* Followers */}
        {/* USE MAP HERE */}
        {following.length > 0 ? (
          following.map((user) => (
            <Followers key={user.following.id} user={user.following} isFollowing={true} />
          ))
        ) : (
          <div className="w-full">
            <p className="text-center py-5 text-sm text-gray-400">
              You have no followers
            </p>
          </div>
        )}
        {/*  */}
      </div>
    </div>
  );
};

export default RightPanel;
