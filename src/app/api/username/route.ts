import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const user = await prisma.user.findUnique({
    where: {
      username: "peterdev",
    },
    select: {
      avatar: true,
    },
  });
  return Response.json(user);
}
