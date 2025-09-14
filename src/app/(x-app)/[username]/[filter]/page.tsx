import Feed, { FilteredTweet } from "@/components/Feed";
import prisma from "@/lib/prisma";

const FilteredPosts = async ({
  params,
}: {
  params: Promise<{ filter: string }>;
}) => {
  const paramsDetails = await (await params).filter;
  let tweets;


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

  // Normalize the tweet
  function normalizePost(tweet): FilteredTweet {
  if ('tweet' in filteredPosts) {
    const t = filteredPosts.tweet;
    return {
      id: t.id,
      content: t.content,
      authorId: t.authorId,
      parentId: t.parentId,
      createdAt: t.createdAt,
      author: {
        username: t.author.username,
        avatar: t.author.avatar,
      },
      _count: t._count,
    };
  } else {
    return {
      id: post.id,
      content: post.content,
      authorId: post.authorId,
      parentId: post.parentId,
      createdAt: post.createdAt,
      author: {
        username: post.author.username,
        avatar: post.author.avatar,
      },
      _count: post._count,
    };
  }
}
  return (
    <div>
      {filteredPosts?.map(post=>(
        <div className="" key={post.id} >
          <Feed post={post}/>
        </div>
      ))}
    </div>
  );
};

export default FilteredPosts;
