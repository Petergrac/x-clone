import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request){
    const url = new URL(req.url);
    const username = url.username;
    console.log(username);

    // // GET Auth details
    const {userId} = await auth();
    if(!userId){
        return "You are not authenticated"
    }
    // Get the id for comparison
    const idMatcher = await prisma.user.findUnique({
        where:{
            username,
        },select:{
            clerkId: true
        }
    });
    if(idMatcher?.clerkId !== userId){
        return Response.json("This account is not yours");
    }
    // Edit the user
   try {
     const userDetails = await prisma.user.findUnique({
        where:{
            username,
            clerkId: userId
        },
        select:{
            username: true,
            banner: true,
            avatar: true,
            location: true,
            website: true
        }
    });
    return Response.json(userDetails);
   } catch (error) {
    throw error;
   }
}