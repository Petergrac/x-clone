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
        followingId: "e56632d3-8b56-40d2-a576-178afbdf05d1",
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
        followerId: "e56632d3-8b56-40d2-a576-178afbdf05d1",
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
          not: "e56632d3-8b56-40d2-a576-178afbdf05d1", // Tweets that are not yours
        },
        parentId: null,
        // Include posts for those who follow you
        OR: [
          { authorId: { in: targetUserIds } }, // All posts for those who follow you
        ],
      },
      // Fields to include
      select: {
        id: true,
        content: true,
        authorId: true,
        parentId: true,
        createdAt: true,
        image: true,
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
            userId: "e56632d3-8b56-40d2-a576-178afbdf05d1",
          },
          select: {
            id: true,
          },
        },
        retweets: {
          where: {
            userId: "e56632d3-8b56-40d2-a576-178afbdf05d1",
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
    revalidatePath("/api/homefeed");
    return Response.json(tweets);
  } catch (error) {
    console.log(error);
  }
}
