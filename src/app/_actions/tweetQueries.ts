"use server";

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
export async function deleteTweet(tweetId: string) {
  // You need to make sure that you include your id or name here
  const deletedTweet = await prisma.tweet.delete({
    where:{
      id: tweetId, 
      author:{
        username:"nicholas78"
      },
    }
  });
  revalidatePath(`/username`);
  return deletedTweet;

}