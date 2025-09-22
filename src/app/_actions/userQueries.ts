"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function userActions(userData: {
  username: string;
  location: string;
  website: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    return "You are not authorized";
  }
  try {
    await prisma.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        ...userData,
      },
    });
    revalidatePath(`/dashboard/`);
  } catch (error) {
    console.error(error);
  }
}

export async function followActions(
  username: string
): Promise<boolean | string> {
  const { userId } = await auth();

  if (!userId) {
    return "You are not authorized";
  }

  try {
    // Get target user by username
    const targetUser = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    // Get current user by Clerk ID
    const currentUser = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });

    if (!targetUser || !currentUser) {
      return "User not found";
    }

    // Check if already followed
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: targetUser.id,
        },
      },
    });

    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: currentUser.id,
            followingId: targetUser.id,
          },
        },
      });
      revalidatePath(`/dashboard/${username}`);
      return false; // Unfollowed
    } else {
      // Follow
      await prisma.follow.create({
        data: {
          followerId: currentUser.id,
          followingId: targetUser.id,
        },
      });
      revalidatePath(`/dashboard/${username}`);
      return true; // Followed
    }
  } catch (error) {
    console.error("Follow action failed:", error);
    return "Server error during follow action";
  }
}
