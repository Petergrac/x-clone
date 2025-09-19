import Feed from "@/components/Feed";
import prisma from "@/lib/prisma";
import Link from "next/link";

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
              username: "nicholas78",
            },
          },
          select: {
            id: true,
          },
        },
        retweets: {
          where: {
            user: {
              username: "nicholas78",
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
                  username: "nicholas78",
                },
              },
              select: {
                id: true,
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
        id: tweet.id,
        content: tweet.content,
        authorId: tweet.authorId,
        parentId: tweet.parentId,
        image: tweet.image,
        author: tweet.author,
        _count: tweet._count,
        likes: tweet.likes,
        retweets: tweet.retweets,
        createdAt: tweet.createdAt,
        interactionType: "reply",
      })),
    ];
  }
  if (filter === "likes" && likedTweets) {
    interactions = [
      ...likedTweets.map((like) => ({
        id: like.tweet.id,
        content: like.tweet.content,
        authorId: like.tweet.authorId,
        parentId: like.tweet.parentId,
        createdAt: like.tweet.createdAt,
        image: like.tweet.image,
        author: like.tweet.author,
        likes: like.tweet.likes,
        retweets: like.tweet.retweets,
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
    return (
      <>
        {interactions.map((tweet) => (
          <Feed key={tweet.id} tweet={tweet} />
        ))}
      </>
    );
  }
};

export default FilteredPosts;
