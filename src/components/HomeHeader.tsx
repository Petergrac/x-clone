import PostFilter from "@/components/PostFilter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

import Link from "next/link";
const media = [
  "/icons/image.svg",
  "/icons/gif.svg",
  "/icons/poll.svg",
  "/icons/emoji.svg",
  "/icons/schedule.svg",
  "/icons/userLocation.svg",
];

const HomeHeader = () => {
  return (
    <div>
      <nav className="w-full pt-5 flex justify-between md:justify-around border-b">
        <Link href="/home" className="font-extrabold border-b-4 border-sky-600">
          For you
        </Link>
        <Link
          href={`/home`}
          className="font-extrabold pb-2 border-b-4 border-sky-600"
        >
          Following
        </Link>
      </nav>
      {/* POST INPUT */}
      <div className="w-full flex items-start border-b">
        {/* AVATAR */}
        <div className="p-5">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        {/* SECTION 2 */}
        <div className="flex grow flex-col">
          {/* INPUT & PERSONALIZATION */}
          <div className="flex flex-col w-full gap-4 border-b py-4">
            {/* Input */}
            <input
              type="text"
              placeholder="What's happening?"
              className="bg-transparent outline-none p-2 w-full placeholder:text-xl placeholder:text-muted-foreground"
            />
            {/* Personalization */}
            <PostFilter />
          </div>
          {/* MEDIA SELECTOR & BUTTON */}
          <div className="flex justify-between items-center py-2 pr-5">
            <div className="flex gap-3 ">
              {media.map((icon) => (
                <Image
                  className="hover:bg-sky-500/55 rounded-full anim"
                  key={icon}
                  src={icon}
                  alt=""
                  width={24}
                  height={24}
                />
              ))}
            </div>
            <button className="w-fit hover:bg-white/55 anim bg-white/75 text-black font-bold text-lg py-2 px-4 rounded-full">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
