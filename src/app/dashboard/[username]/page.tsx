import Feed from "@/components/Feed";
import UserDetails from "@/components/UserDetails";
import UserPostNav from "@/components/UserPostNav";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const UserPosts = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const userName = (await params).username;
  // Fetch user data
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Could not authenticate the user");
  }
  const data = await prisma.user.findUnique({
    where: {
      username: userName,
    },
    include: {
      tweets: {
        include: {
          _count: {
            select: {
              replies: true,
              retweets: true,
              likes: true,
            },
          },
          likes: {
            where: {
              user: {
                clerkId: userId,
              },
            },
            select: {
              id: true,
            },
          },
          retweets: {
            where: {
              user: {
                clerkId: userId,
              },
            },
            select: {
              id: true,
            },
          },
        },
      },
      _count: {
        select: {
          retweets: true,
          followers: true,
          following: true,
        },
      },
    },
  });
  if (!data) {
    return (
      <div className="h-[40vh] flex items-center justify-center">
        You have no posts right now.
      </div>
    );
  }
  const tweets = [
    ...data.tweets.map((tweet) => ({
      ...tweet,
      author: {
        username: data.username,
        avatar: data.avatar,
        name: data.name,
        id: data.id,
      },
    })),
  ];
  const user = {
    username: data?.username,
    banner: data?.banner,
    id: data.id,
    name: data.name,
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
        <div className="my-17">
          <div className="flex items-center bg-black/55 w-full gap-4 ml-3 fixed top-0 z-10 ">
            <Link
              href={`/dashboard`}
              className="hover:bg-gray-800 aspect-square p-2 rounded-full"
            >
              <ArrowLeftIcon />
            </Link>
            {/* Name & Number of posts */}
            <div className="flex flex-col justify-start">
              <p className="text-2xl font-bold">{data?.name}</p>
              <p className="text-sm text-muted-foreground">
                {data?.tweets.length} posts
              </p>
            </div>
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
        <div className="">
          {tweets.length === 0 && (
            <div className="text-center text-sm text-gray-200 mt-5">
              There are no tweets here. Click{" "}
              <Link className="text-sky-500 hover:underline anim" href={`/dashboard`}>Here</Link> to be back to homepage.
            </div>
          )}
          {tweets.map((tweet) => (
            <div className="" key={tweet.id}>
              <Feed tweet={tweet} />
            </div>
          ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default UserPosts;
