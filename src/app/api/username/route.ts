import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const {userId} = await auth();
  if(!userId){
    return Response.json("No user specified")
  }
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      avatar: true,
      username: true,
    },
  });
  return Response.json(user);
}
