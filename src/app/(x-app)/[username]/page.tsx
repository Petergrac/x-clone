import Feed from "@/components/Feed";
import UserDetails from "@/components/UserDetails";
import UserPostNav from "@/components/UserPostNav";
import prisma from "@/lib/prisma";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const UserPosts = async () => {
  // Fetch user data
  const data = await prisma.user.findUnique({
    where: {
      username: "peterdev",
    },
    include: {
      tweets: true,
      _count: {
        select: {
          retweets: true,
          followers: true,
          following: true,
        },
      },
    },
  });
  const user = {
    username: data?.username,
    banner: data?.banner,
    bio: data?.bio,
    avatar: data?.avatar,
    createdAt: data?.createdAt,
    followers: data?._count.followers,
    following: data?._count.following,
  };

  return (
    <div>
      <div className="">
        {/* NAME, NUMBER OF POSTS */}
        <div className="flex items-center gap-4 ml-3 mt-3">
          <Link
            href={`/`}
            className="hover:bg-gray-800 aspect-square p-2 rounded-full"
          >
            <ArrowLeftIcon />
          </Link>
          {/* Name & Number of posts */}
          <div className="flex flex-col justify-start">
            <p className="text-2xl font-bold">{data?.username || "ℕΣΜΣЅℐЅ"}</p>
            <p className="text-sm text-muted-foreground">
              {data?.tweets.length} posts
            </p>
          </div>
        </div>
        {/* BANNER  & USER DETAILS*/}
        <div>
          <UserDetails userDetails={user} />
        </div>
        {/* NAV MENU TO NAVIGATE WITH DIFFERENT FILTERS */}
        <div className="">
          <UserPostNav />
        </div>
      </div>{" "}
      <Feed />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
    </div>
  );
};

export default UserPosts;
