"use server";

import TweetFilter from "@/components/TweetFilter";
import prisma from "@/lib/prisma";
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
  const newTweet = await prisma.tweet.create({
    data: {
      content: content,
      image: imageUrl,
      isSensitive: sensitivity,
      author: {
        connect: {
          username: "nicholas78",
        },
      },
    },
  });
  console.log(newTweet);
  return newTweet;
}

/**
 *
 * ========================== DELETE A TWEET ================
 * @param tweetId
 * @returns
 */
export async function deleteTweet(tweetId: string) {
  // You need to make sure that you include your id or name here
  const deletedTweet = await prisma.tweet.delete({
    where: {
      id: tweetId,
      author: {
        username: "nicholas78",
      },
    },
  });
  revalidatePath(`/username`);
  return deletedTweet;
}
/**
 *  =====================
 *                      HANDLE RETWEETS
 *                            =============================
 * @param originalId
 * @param userId
 * @returns
 */
export async function reTweet(originalId: string, userId: string) {
  // Check if the retweet is in the record
  const hasRetweeted = await prisma.retweet.findUnique({
    where: {
      userId_tweetId: {
        userId: "e56632d3-8b56-40d2-a576-178afbdf05d1",
        tweetId: originalId,
      },
    },
  });
  // Add the record if it is not available
  if (!hasRetweeted) {
    const retweet = await prisma.retweet.create({
      data: {
        userId: "e56632d3-8b56-40d2-a576-178afbdf05d1",
        tweetId: originalId,
      },
    });
    revalidatePath(`/`);
    return !!retweet;
  } else {
    const deletedTweet = await prisma.retweet.delete({
      where: {
        userId_tweetId: {
          userId: "e56632d3-8b56-40d2-a576-178afbdf05d1",
          tweetId: originalId,
        },
      },
    });
    revalidatePath(`/`);
    return !!deletedTweet;
  }
}

export async function likeActions(tweetId: string, userId: string) {
  // Check if the user has liked the tweet
  const hasLiked = await prisma.like.findUnique({
    where: {
      userId_tweetId: {
        userId: "e56632d3-8b56-40d2-a576-178afbdf05d1",
        tweetId,
      },
    },
  });
  // Add like record if the user has not liked the tweet
  if (!hasLiked) {
    const newLike = await prisma.like.create({
      data: {
        userId: "e56632d3-8b56-40d2-a576-178afbdf05d1",
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
          userId: "e56632d3-8b56-40d2-a576-178afbdf05d1",
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
