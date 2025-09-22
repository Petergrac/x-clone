import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");

  // // GET Auth details
  const { userId } = await auth();
  if (!userId && username === null) {
    return Response.json("You are not authenticated");
  }
  if (username) {
    // Get the id for comparison
    const idMatcher = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        clerkId: true,
        id: true,
      },
    });
    if (idMatcher?.clerkId !== userId && userId) {
      // Check the follow status

      // Find user Id
      const currentId = await prisma.user.findUnique({
        where: {
          clerkId: userId,
        },
        select: {
          id: true,
        },
      });
      // Return follow status
      if (idMatcher?.id && currentId) {
        const hasFollowed = await prisma.follow.findUnique({
          where: {
            followerId_followingId: {
              followerId: currentId.id,
              followingId: idMatcher.id,
            },
          },
          select: {
            followerId: true,
          },
        });
        return Response.json(!!hasFollowed);
      }
    }
  }
  // Edit the user
  if (username && userId) {
    try {
      const userDetails = await prisma.user.findUnique({
        where: {
          username,
          clerkId: userId,
        },
        select: {
          id: true,
          username: true,
          banner: true,
          avatar: true,
          location: true,
          website: true,
        },
      });
      return Response.json(userDetails);
    } catch (error) {
      throw error;
    }
  }
}
