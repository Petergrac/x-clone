"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function replyTweet(parentId: string, content: string) {
    const reply = await prisma.tweet.create({
        data:{
            content: content,
            parentId: parentId,
            authorId: "e56632d3-8b56-40d2-a576-178afbdf05d1"
        }
    });
    revalidatePath(`/[username]/status/[tweetId]`)
    return reply;
}
