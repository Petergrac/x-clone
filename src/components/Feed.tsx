"use client";
import {
  Bookmark,
  Eye,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat,
  Share,
  Trash2Icon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useState } from "react";
import { TweetInteraction } from "@/types/tweet";
import Image from "./Image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { deleteTweet, reTweet } from "@/app/_actions/tweetQueries";
import { toast } from "sonner";
import TweetInput from "./TweetInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const Feed = ({ tweet }: { tweet: TweetInteraction; hasLiked?: boolean }) => {
  const [showMore, setShowMore] = useState(false);
  const [sensitiveTrigger, setTrigger] = useState(tweet.isSensitive);
  const [isRetweeted, setRetweeted] = useState(!!tweet.retweets.length);
  const [retweetCount, setRetweetCount] = useState(tweet._count.retweets);

  // Delete a tweet
  const handleDelete = async () => {
    const deletedTweet = await deleteTweet(tweet.id);
    if (deletedTweet) {
      toast.success("Tweet deleted");
    } else {
      toast.error("Tweet could not be deleted");
    }
  };

  // Retweet a tweet
  const handleRetweet = async () => {
    if (tweet.id) {
      if (isRetweeted) {
        setRetweetCount(retweetCount - 1);
        setRetweeted(false)
      } else {
        setRetweetCount(retweetCount + 1);
        setRetweeted(true)
      }
      const retweet = await reTweet(tweet.id, "");
      if (retweet) {
      }
    }
  };
  return (
    <div className="border-t">
      {isRetweeted && (
        <div className="px-5 pt-2 text-sm  text-gray-400 flex items-center gap-2">
          <Repeat size={17} />
          <p className="text-white/85">You Reposted</p>
        </div>
      )}
      <div className="w-full flex items-start py-3">
        {/* Profile */}
        <Link href={`/${tweet.author.username}`} className="p-4">
          <Avatar>
            <Avatar>
              <AvatarImage
                src={tweet.author.avatar || "https://github.com/shadcn.png"}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Avatar>
        </Link>
        <div className="flex flex-col grow pt-2">
          {/* Username date more */}
          <div className="flex justify-between items-center">
            {/* User Info */}
            <div className="flex items-center gap-2">
              {/* Username */}
              <Link
                href={`/${tweet.author.username}`}
                className="text-lg font-semibold text-white/85"
              >
                {tweet.author.username}
              </Link>
              {/* tweet handle */}
              <Link
                href={`/${tweet.author.username}`}
                className="text-gray-500"
              >
                @{tweet.author.username}
              </Link>
              <p className="text-gray-500">&middot;</p>
              {/* Date */}
              <Link
                href={`/${tweet.author.username}/status/${tweet.id}`}
                className="text-gray-500"
              >
                {new Date(tweet.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </Link>
            </div>
            {/* More */}
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <MoreHorizontal
                  width={30}
                  className="pr-2 text-gray-500 hover:text-gray-600 anim"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-500"
                >
                  <Trash2Icon color="red" />
                  <p className="font-bold text-sm">Delete</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Tweet content */}
          {tweet.content && (
            <Link
              href={`/${tweet.author.username}/status/${tweet.id}`}
              className="text-white/85 pr-2"
            >
              <p className={`${showMore ? "" : "max-h-22 overflow-hidden"}`}>
                {tweet.content}
              </p>
            </Link>
          )}
          {tweet.content && tweet.content.length > 200 && (
            <button
              onClick={() => setShowMore((prev) => !prev)}
              className="text-sky-400 hover:underline pb-2 text-end pr-2"
            >
              Show {showMore ? "less" : "more"}
            </button>
          )}
          {/* Image, video, gif content */}
          {tweet.image && (
            <Link
              href={`/${tweet.author.username}/status/${tweet.id}`}
              className="mx-auto w-full relative"
            >
              {sensitiveTrigger && tweet.isSensitive && (
                <button
                  onClick={() => setTrigger((prev) => !prev)}
                  className="absolute top-1/2 left-1/2 z-10"
                >
                  <Eye />
                </button>
              )}
              <div className="pr-8 pt-5">
                <Image
                  src={tweet.image || "/general/post.jpg"}
                  isSensitive={sensitiveTrigger}
                  width={600}
                  height={400}
                  feed={true}
                  alt=""
                  tr={true}
                />
              </div>
            </Link>
          )}
          {/* Comment, repost, like, views, save, share */}
          <div className="flex text-gray-500 justify-between pr-4 mt-2">
            {/* COMMENTS */}
            <Dialog>
              <DialogTrigger className="outline-none">
                <p className="flex items-center gap-2 hover:text-sky-500 anim cursor-pointer">
                  <MessageCircle width={20} /> {tweet._count.replies}
                </p>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-base">
                    Replying to{" "}
                    <span className="text-gray-500 text-sm">
                      @{tweet.author.username}
                    </span>
                  </DialogTitle>
                  <DialogDescription className="min-h-10 max-h-32 overflow-hidden text-start">
                    {/* Make sure you  */}
                    {tweet.content}
                  </DialogDescription>
                </DialogHeader>
                <TweetInput parentId={tweet.id} tweetType="Reply2" />
              </DialogContent>
            </Dialog>
            {/* RETWEETS */}
            <p
              onClick={handleRetweet}
              className={`flex items-center gap-2 ${
                isRetweeted ? "text-green-500" : "hover:text-green-400"
              }  cursor-pointer`}
            >
              <Repeat width={20} />
              {retweetCount}
            </p>
            {/* LIKES */}
            <p
              className={
                tweet.likes && tweet.likes.length > 0
                  ? "text-rose-500 flex items-center gap-2 cursor-pointer"
                  : "flex items-center gap-2 cursor-pointer hover:text-rose-600 anim"
              }
            >
              <Heart width={20} />
              {tweet._count.likes}
            </p>
            <div className="flex gap-4 ">
              <Bookmark
                width={40}
                className="hover:text-sky-500 cursor-pointer anim"
              />
              <Share
                width={20}
                className="cursor-pointer hover:text-sky-500 anim"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
