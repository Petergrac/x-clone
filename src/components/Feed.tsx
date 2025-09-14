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

const Feed = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="w-full flex items-start border-t py-3">
      {/* Profile */}
      <Link href={`/username`} className="p-4">
        <Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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
              href={`/username`}
              className="text-lg font-semibold text-white/85"
            >
              Goddie
            </Link>
            {/* tweet handle */}
            <Link href={`/username`} className="text-gray-500">
              @Goodie_ke
            </Link>
            <p className="text-gray-500">&middot;</p>
            {/* Date */}
            <Link href={`/username/status/postId`} className="text-gray-500">
              Sep 8
            </Link>
          </div>
          {/* More */}
          <MoreHorizontal
            width={30}
            className="pr-2 text-gray-500 hover:text-gray-600 anim"
          />
        </div>
        {/* Tweet content */}
        <Link href={`/username/status/postId`} className="text-white/85 pr-2">
          <p className={`${showMore ? "" : "h-22 overflow-hidden"}`}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
            ipsam est ab accusantium iusto qui aperiam at fugiat amet itaque
            omnis nesciunt necessitatibus tenetur officia sequi, consequatur
            veniam cum. Voluptates! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Modi impedit minus facere incidunt voluptates eos,
            quo blanditiis reprehenderit, porro neque quidem quod ipsum! Facere
            est animi quod, dolores quia cumque.
          </p>
        </Link>
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="text-sky-400 hover:underline pb-2 text-end pr-2"
        >
          Show {showMore ? "less" : "more"}
        </button>

        {/* Image, video, gif content */}
        <Link href={`/username/status/postId`} className="mx-auto w-full">
          <Image
            src="/general/post.jpg"
            alt=""
            width={500}
            height={500}
            className="object-center rounded-2xl "
          />
        </Link>
        {/* Comment, repost, like, views, save, share */}
        <div className="flex text-gray-500 justify-between pr-4 mt-2">
          <p className="flex items-center gap-2 hover:text-sky-500 anim cursor-pointer">
            <MessageCircle width={20} /> 213
          </p>
          <p className="flex items-center gap-2 hover:text-green-400 cursor-pointer">
            <Repeat width={20} />
            50
          </p>
          <p className="flex items-center gap-2 cursor-pointer hover:text-rose-600 anim">
            <Heart width={20} />
            1.3k
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
  );
};

export default Feed;
