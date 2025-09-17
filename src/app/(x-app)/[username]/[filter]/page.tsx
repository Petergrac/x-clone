import Feed from "@/components/Feed";
import prisma from "@/lib/prisma";
import Link from "next/link";

export type TweetInteraction = {
  id: string;
  content: string;
  authorId: string;
  parentId: string | null;
  createdAt: string;
  image: string[];
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
  likes?: { id: string }[];
  retweets?: { id: string }[];
  // Optional metadata to know where it came from
  interactionType?: string;
  likedAt?: string; // if it's a liked tweet
};

const FilteredPosts = async ({
  params,
}: {
  params: Promise<{ filter: string; username: string }>;
}) => {
  const { filter, username } = await params;
  let replies;
  let likedTweets;
  let interactions;

  // Check for replies
  if (filter === "replies") {
    replies = await prisma.tweet.findMany({
      where: {
        author: {
          username: username,
        },
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
            user: {
              username,
            },
          },
          select: {
            id: true,
          },
        },
        retweets: {
          where: {
            user: {
              username,
            },
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
  } else if (filter === "likes") {
    likedTweets = await prisma.like.findMany({
      where: {
        user: {
          username,
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
  if (filter === "replies" && replies) {
    // Normalize the tweet
    interactions = [
      ...replies.map((tweet) => ({
        ...tweet,
        interactionType: "reply",
      })),
    ];
  }
  if (filter === "likes" && likedTweets) {
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
  if (!interactions || interactions.length === 0) {
    return (
      <div className="h-[40vh] w-full flex items-center justify-center">
        {filter === "replies" ? (
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
  } else {
    console.log('Is feed being hit')
    return (
      <>
        {interactions.map((tweet) => (
          <Feed key={tweet.id} tweet={tweet} hasLiked={filter === "likes"} />
        ))}
      </>
    );
  }
};

export default FilteredPosts;
