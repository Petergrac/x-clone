import Feed from "@/components/Feed";
import prisma from "@/lib/prisma";
import Link from "next/link";

export type TweetInteraction = {
  id: string;
  content: string;
  authorId: string;
  parentId: string | null;
  createdAt: Date;
  author: {
    username: string;
    avatar: string | null;
    name?: string; // only available in liked tweets
  };
  _count: {
    replies: number;
    retweets: number;
    likes: number;
  };
  likes?: {id: string}[];
  retweets?: {id: string}[];
  // Optional metadata to know where it came from
  interactionType?: string;
  likedAt?: Date; // if it's a liked tweet
};

const FilteredPosts = async ({
  params,
}: {
  params: Promise<{ filter: string }>;
}) => {
  const paramsDetails = (await params).filter;
  let replies;
  let likedTweets;
  let interactions;
  // Check for replies
  if (paramsDetails === "replies") {
    replies = await prisma.tweet.findMany({
      where: {
        authorId: "07f1378f-4587-4c21-b8ee-439b43db9846",
        parentId: {
          not: null,
        },
      },
      include: {
        author: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            replies: true,
            retweets: true,
            likes: true,
          },
        },
        likes: {
          where: {
            userId: "07f1378f-4587-4c21-b8ee-439b43db9846",
          },
          select: {
            id: true,
          },
        },
        retweets: {
          where: {
            userId: "07f1378f-4587-4c21-b8ee-439b43db9846",
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (paramsDetails === "likes") {
    likedTweets = await prisma.like.findMany({
      where: {
        user: {
          username: "ena25",
        },
      },
      include: {
        tweet: {
          include: {
            author: {
              select: {
                username: true,
                name: true,
                avatar: true,
              },
            },
            _count: {
              select: {
                replies: true,
                retweets: true,
                likes: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  if (paramsDetails === "replies" && replies) {
    // Normalize the tweet
    interactions = [
      ...replies.map((tweet) => ({
        ...tweet,
        interactionType: "reply",
      })),
    ];
  }
  if (paramsDetails === "likes" && likedTweets) {
    interactions = [
      ...likedTweets.map((like) => ({
        ...like.tweet,
        author: like.tweet.author,
        _count: like.tweet._count,
        interactionType: "like",
        likedAt: like.createdAt,
      })),
    ];
  }
  if (!interactions || interactions.length === 0)
    return (
      <div className="h-[40vh] w-full flex items-center justify-center">
        {paramsDetails === "replies" ? (
          <p className="text-sm">
            You haven&apos;t replied to any post.Click{" "}
            <Link className="text-sky-500 hover:underline" href={`/`}>
              Here
            </Link>{" "}
            to go back to homepage
          </p>
        ) : (
          <p className="text-sm">
            You have&apos;nt liked any post.Click
            <Link className="text-sky-500 hover:underline" href={`/`}>
              Here
            </Link>{" "}
            to go back to homepage
          </p>
        )}
      </div>
    );
  return (
    <div>
      {interactions.map((tweet) => (
        <div className="" key={tweet.id}>
          <Feed tweet={tweet} hasLiked={paramsDetails === "likes"} />
        </div>
      ))}
    </div>
  );
};

export default FilteredPosts;
