"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function replyTweet(parentId: string, content: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User on authenticated");
  }
  const id = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      username: true
    },
  });
  if (!id) {
    return "No id found";
  }
  const reply = await prisma.tweet.create({
    data: {
      content: content,
      parentId: parentId,
      authorId: id.id,
    },
  });
  revalidatePath(`/${id.username}/status/${id.id}`);
  return reply;
}
