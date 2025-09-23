import prisma from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const evt = await verifyWebhook(req);
  // Do something with payload
  // For this guide, log payload to console

  if (evt.type === "user.created") {
    console.log(evt.data);
    try {
      await prisma.user.create({
        data: {
          clerkId: evt.data.id,
          avatar: evt.data.image_url,
          email:
            evt.data.email_addresses &&
            evt.data.email_addresses[0].email_address,
          name: evt.data.first_name + " " + evt.data.last_name,
          username: evt.data.username || "John Doe",
        },
      });
    } catch (error) {
      console.log(error);
      console.error("Could not create the user");
    }
  }
  if (evt.type === "user.updated") {
    try {
      await prisma.user.update({
        where: {
          clerkId: evt.data.id,
        },
        data: {
          clerkId: evt.data.id,
          avatar: evt.data.image_url,
          email:
            evt.data.email_addresses &&
            evt.data.email_addresses[0].email_address,
          name: evt.data.first_name + " " + evt.data.last_name,
          username: evt.data.username || "John Doe",
        },
      });
      console.log("Updated The User");
    } catch (error) {
      console.log("Could not update the user");
      console.log(error);
    }
  }
  if (evt.type === "user.deleted") {
    try {
      const deleteUser = await prisma.user.delete({
        where: {
          clerkId: evt.data.id,
        },
      });
      console.log("Deleted the user");
    } catch (error) {
      console.log("Could not delete the user", error);
    }
  }
  return new Response("Webhook received", { status: 200 });
}
