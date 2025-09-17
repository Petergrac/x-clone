import prisma from "@/lib/prisma";

export async function GET() {
  const user = await prisma.user.findUnique({
    where: {
      username: "ena25",
    },
    select: {
      avatar: true,
      username: true,
    },
  });
  return Response.json(user);
}
