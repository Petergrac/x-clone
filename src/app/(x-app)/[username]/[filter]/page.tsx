import Feed from "@/components/Feed";
import prisma from "@/lib/prisma";

const FilteredPosts = async ({
  params,
}: {
  params: Promise<{ filter: string }>;
}) => {
  const paramsDetails = await (await params).filter;
  let filteredPosts;
  // Check for replies
  if (paramsDetails === "replies") {
    filteredPosts = await prisma.tweet.findMany({
      where: {
        authorId: "c6c6f621-0c0b-473b-b992-d1d6b1c86dae",
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (paramsDetails === "likes") {
    filteredPosts = await prisma.like.findMany({
      where: {
        user: {
          username: "peterdev",
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
  console.log(filteredPosts);
  return (
    <div>
      <Feed />
    </div>
  );
};

export default FilteredPosts;
