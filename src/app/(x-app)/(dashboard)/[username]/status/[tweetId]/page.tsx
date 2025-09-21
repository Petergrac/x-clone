import Feed from "@/components/Feed";
import TweetInput from "@/components/TweetInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import prisma from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const PostDetails = async ({
  params,
}: {
  params: Promise<{ tweetId: string }>;
}) => {
  // Find this specific tweet
  const { tweetId } = await params;
  const mainTweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
    },
    include: {
      author: {
        select: {
          username: true,
          avatar: true,
          name: true,
        },
      },
      _count: {
        select: {
          replies: true,
          retweets: true,
          likes: true,
        },
      },
      likes: {
        where: {
          user: {
            username: "nicholas78",
          },
        },
      },
      retweets: {
        where: {
          user: {
            username: "nicholas78",
          },
        },
        select: {
          id: true,
        },
      },
    },
  });

  // The tweet replies
  const replies = await prisma.tweet.findMany({
    where: {
      parentId: tweetId,
    },
    include: {
      author: {
        select: {
          username: true,
          avatar: true,
          name: true,
        },
      },
      _count: {
        select: {
          replies: true,
          retweets: true,
          likes: true,
        },
      },
      likes: {
        where: {
          user: {
            username: "nicholas78",
          },
        },
      },
      retweets: {
        where: {
          user: {
            username: "nicholas78",
          },
        },
        select: {
          id: true,
        },
      },
    },
  });

  if (!mainTweet) {
    // Handle null tweets
    return (
      <div className="h-[50vh] w-full font-bold flex justify-center items-center gap-4 flex-col">
        <p className="text-red-500">This tweet does not exist</p>
        <Link
          href={`/`}
          className="bg-white rounded-2xl py-2 px-4 text-black anim"
        >
          Home
        </Link>
      </div>
    );
  }
  return (
    <div className="mt-6">
      {/* Page bar */}
      <div className="flex w-full md:w-150 justify-between fixed top-0 z-20  items-center bg-black/50 px-4 py-4">
        <div className="justify-start flex items-center gap-5">
          <Link href={`/`}>
            <ArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold">Post</h1>
        </div>
        {/* Reply & Filters */}
        <Dialog>
          <DialogTrigger className="font-bold border-2  border-white/75 py-2 px-4 rounded-full cursor-pointer hover:bg-gray-800 anim">
            Reply
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-base">
                Replying to{" "}
                <span className="text-gray-500 text-sm">
                  @{mainTweet.author.username}
                </span>
              </DialogTitle>
              <DialogDescription className="min-h-10 max-h-32 overflow-hidden text-start">
                {/* Make sure you  */}
                {mainTweet.content}
              </DialogDescription>
            </DialogHeader>
            <TweetInput parentId={tweetId} tweetType="Reply" />
          </DialogContent>
        </Dialog>
      </div>
      <br className="pt-15" />
      {/* Main Tweet  */}
      <Feed tweet={mainTweet} />
      <TweetInput parentId={tweetId} tweetType="Reply2" />
      {/* Replies */}
      {replies.length > 0 ? (
        replies.map((reply) => <Feed key={reply.id} tweet={reply} />)
      ) : (
        <div className="text-center py-20 font-bold text-2xl">
          Be the first to reply
        </div>
      )}
    </div>
  );
};

export default PostDetails;
