"use server";

import TweetFilter from "@/components/TweetFilter";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 *  ======================  THIS METHOD CREATES A NEW TWEET =======
 * @param imageUrl
 * @param sensitivity
 * @param content
 * @returns
 */
export async function CreateTweet(
  imageUrl: string,
  sensitivity: boolean,
  content?: string
) {
  const { userId } = await auth();
  if (!userId) {
    return "User not authenticated";
  }
  const newTweet = await prisma.tweet.create({
    data: {
      content: content,
      image: imageUrl,
      isSensitive: sensitivity,
      author: {
        connect: {
          clerkId: userId,
        },
      },
    },
    select: {
      id: true,
    },
  });
  revalidatePath(`/`);
  return !!newTweet;
}

/**
 *
 * ========================== DELETE A TWEET ================
 * @param tweetId
 * @returns
 */
export async function deleteTweet(tweetId: string) {
  const { userId } = await auth();
  if (!userId) {
    return "User not authenticated";
  }
  // You need to make sure that you include your id or name here
  const deletedTweet = await prisma.tweet.delete({
    where: {
      id: tweetId,
      author: {
        clerkId: userId,
      },
    },
    select: {
      id: true,
    },
  });
  revalidatePath(`/username`);
  return !!deletedTweet;
}
/**
 *  =====================
 *                      HANDLE RETWEETS
 *                            =============================
 * @param originalId
 * @param userId
 * @returns
 */
export async function reTweet(originalId: string) {
  const { userId } = await auth();
  if (!userId) {
    return "User not authenticated";
  }
  const data = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
    },
  });
  if (!data) return "There is no such user";
  // Check if the retweet is in the record
  const hasRetweeted = await prisma.retweet.findUnique({
    where: {
      userId_tweetId: {
        userId: data.id,
        tweetId: originalId,
      },
    },
  });
  // Add the record if it is not available
  if (!hasRetweeted) {
    const retweet = await prisma.retweet.create({
      data: {
        userId: data.id,
        tweetId: originalId,
      },
    });
    revalidatePath(`/`);
    return !!retweet;
  } else {
    const deletedTweet = await prisma.retweet.delete({
      where: {
        userId_tweetId: {
          userId,
          tweetId: originalId,
        },
      },
    });
    revalidatePath(`/`);
    return !!deletedTweet;
  }
}

export async function likeActions(tweetId: string) {
  // Check if the user has liked the tweet
  const { userId } = await auth();
  if (!userId) {
    return "User not authenticated";
  }
  const data = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
    },
  });
  if (!data) return "There is no such user";

  const hasLiked = await prisma.like.findUnique({
    where: {
      userId_tweetId: {
        userId: data.id,
        tweetId,
      },
    },
  });
  // Add like record if the user has not liked the tweet
  if (!hasLiked) {
    const newLike = await prisma.like.create({
      data: {
        userId: data.id,
        tweetId,
      },
      select: {
        id: true,
      },
    });
    return !!newLike;
  } else {
    const deleteLike = await prisma.like.delete({
      where: {
        userId_tweetId: {
          userId: data.id,
          tweetId,
        },
      },
      select: {
        id: true,
      },
    });

    return !!deleteLike;
  }
}
