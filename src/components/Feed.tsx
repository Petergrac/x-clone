"use client";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat,
  Share,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TweetInteraction } from "@/types/tweet";

const Feed = ({
  tweet,
  hasLiked,
}: {
  tweet: TweetInteraction;
  hasLiked?: boolean;
}) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="border-t">
      <div className="px-5 pt-2 text-sm  text-gray-400 flex items-center gap-2">
        <Repeat size={17} />
        <p className="text-white/85">Reposted</p>
      </div>
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
            <MoreHorizontal
              width={30}
              className="pr-2 text-gray-500 hover:text-gray-600 anim"
            />
          </div>
          {/* Tweet content */}
          <Link
            href={`/${tweet.author.username}/status/${tweet.id}`}
            className="text-white/85 pr-2"
          >
            <p className={`${showMore ? "" : "max-h-22 overflow-hidden"}`}>
              {tweet.content}
            </p>
          </Link>
          {tweet.content.length > 200 && (
            <button
              onClick={() => setShowMore((prev) => !prev)}
              className="text-sky-400 hover:underline pb-2 text-end pr-2"
            >
              Show {showMore ? "less" : "more"}
            </button>
          )}
          {/* Image, video, gif content */}
          <Link
            href={`/${tweet.author.username}/status/${tweet.id}`}
            className="mx-auto w-full"
          >
            <Image
              src={"/general/post.jpg"}
              alt=""
              width={500}
              height={500}
              className="object-center rounded-2xl "
            />
          </Link>
          {/* Comment, repost, like, views, save, share */}
          <div className="flex text-gray-500 justify-between pr-4 mt-2">
            {/* COMMENTS */}
            <p className="flex items-center gap-2 hover:text-sky-500 anim cursor-pointer">
              <MessageCircle width={20} /> {tweet._count.replies}
            </p>
            {/* RETWEETS */}
            <p
              className={`flex items-center gap-2 ${
                tweet.retweets && tweet.retweets?.length > 0
                  ? "text-green-500"
                  : "hover:text-green-400"
              }  cursor-pointer`}
            >
              <Repeat width={20} />
              {tweet._count.retweets}
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
