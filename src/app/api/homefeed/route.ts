import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  // Get tweets not authored by me, include those i follow, random tweets,
  // 1. First get the ids of those who follow you

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const isFollowing = searchParams.get("feedType");

  const {userId} = await auth();
  console.log(userId);

  if(!userId){
    return;
  }
  let targetUserIds: string[] = [];

  if (!isFollowing) {
    // Find all users following you
    const whoFollowsMe = await prisma.follow.findMany({
      where: {
        following:{
          clerkId: userId
        }
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
        follower:{
          clerkId: userId
        }
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
        parentId: null,
        // Include posts for those who follow you
        OR: [
          { authorId: { in: targetUserIds } },
          {authorId: {notIn: [...targetUserIds]}} // All posts for those who follow you
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
            id: true
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
            user:{
              clerkId: userId
            }
          },
          select: {
            id: true,
          },
        },
        retweets: {
          where: {
            user:{
              clerkId: userId
            }
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
