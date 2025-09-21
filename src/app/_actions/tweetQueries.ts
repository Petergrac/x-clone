"use server";

import prisma from "@/lib/prisma";

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
