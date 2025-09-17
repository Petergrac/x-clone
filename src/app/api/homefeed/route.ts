import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  // Get tweets not authored by me, include those i follow, random tweets,
  // 1. First get the ids of those who follow you

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const isFollwing = searchParams.get("feedType");


  let targetUserIds: string[] = [];

  if (!isFollwing) {
    // Find all users following you
    const whoFollowsMe = await prisma.follow.findMany({
      where: {
        followingId: "07f1378f-4587-4c21-b8ee-439b43db9846",
      },
      select: {
        followerId: true,
      },
    });
    // Return the ids
    targetUserIds = whoFollowsMe.map((f) => f.followerId);
  } else {
    //Get all ids of those that you follow
    const whoDoIFollow = await prisma.follow.findMany({
      where: {
        followerId: "07f1378f-4587-4c21-b8ee-439b43db9846",
      },
      select: {
        followingId: true,
      },
    });
    targetUserIds = whoDoIFollow.map((f) => f.followingId);
  }
  // Search the tweets of those who follow you and other related tweets
  try {
    const tweets = await prisma.tweet.findMany({
      where: {
        authorId: {
          not: "07f1378f-4587-4c21-b8ee-439b43db9846", // Tweets that are not yours
        },
        parentId: null,
        // Include posts for those who follow you
        OR: [
          { authorId: { in: targetUserIds } }, // All posts for those who follow you
          {
            authorId: {
              notIn: [...targetUserIds , "07f1378f-4587-4c21-b8ee-439b43db9846"], // Other posts from those who don't follow you
            },
          },
        ],
      },
      // Fields to include
      select: {
        id: true,
        content: true,
        authorId: true,
        parentId: true,
        createdAt: true,
        author: {
          select: {
            username: true,
            avatar: true,
            name: true,
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
      take: 20,
    });
    revalidatePath('/api/homefeed')
    return Response.json(tweets);
  } catch (error) {
    console.log(error);
  }
}
