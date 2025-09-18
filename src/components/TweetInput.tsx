"use client";
import TweetFilter from "@/components/TweetFilter";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const media = [
  "/icons/image.svg",
  "/icons/gif.svg",
  "/icons/poll.svg",
  "/icons/emoji.svg",
  "/icons/schedule.svg",
  "/icons/userLocation.svg",
];
type UserType = {
  avatar: string | null;
  username: string | null;
} | null;

const TweetInput = ({
  tweetType,
  user,
}: {
  tweetType: string;
  user?: UserType;
}) => {
  const [iconsToggle, setToggle] = useState(false);
  return (
    <div>
      <div className="w-full flex items-start border-t mt-10">
        {/* AVATAR */}
        <Link href={`/${user?.username}`} className="p-5">
          <Image
            src={user?.avatar || "https://github.com/shadcn.png"}
            alt=""
            width={44}
            height={44}
            className="rounded-full overflow-hidden"
          />
        </Link>
        {/* SECTION 2 */}
        <div className="flex grow flex-col">
          {/* INPUT & PERSONALIZATION */}
          <div
            className={`flex ${
              tweetType === "Reply2" && iconsToggle === true
                ? "pr-5"
                : "flex-col"
            } w-full gap-4  py-4`}
          >
            {/* Input */}
            <input
              type="text"
              onClick={() => {
                if (tweetType === "Reply2" && iconsToggle) setToggle(false);
              }}
              onBlur={() => {
                if (tweetType === "Reply2" && !iconsToggle) setToggle(true);
              }}
              placeholder={`${
                tweetType === "Post" ? "What's happening?" : "Post your Reply"
              }`}
              className="bg-transparent outline-none p-2 w-full placeholder:text-xl placeholder:text-muted-foreground"
            />
            {tweetType === "Reply2" && iconsToggle === true && (
              <button className="w-fit hover:bg-white/55 anim bg-white/75 text-black font-bold text-lg py-2 px-4 rounded-full">
                {tweetType.charAt(0) === "R" ? "Reply" : "Post"}
              </button>
            )}
            {/* Personalization */}
            {tweetType === "Reply2" && iconsToggle === true ? null : (
              <TweetFilter />
            )}
          </div>
          {/* MEDIA SELECTOR & BUTTON */}
          <div className="flex justify-between items-center py-2 pr-5">
            <div className="flex  gap-3">
              {tweetType === "Reply2" && iconsToggle === true
                ? null
                : media.map((icon) => (
                    <div className="" key={icon}>
                      {icon === "/icons/image.svg" ? (
                        <label htmlFor="image">
                          <Image src={icon} width={24} height={24} alt={icon} />
                          <input
                            type="file"
                            className="hidden"
                            name="images"
                            id="image"
                          />
                        </label>
                      ) : (
                        <Image
                          className="hover:bg-sky-500/55 rounded-full anim"
                          src={icon}
                          alt=""
                          width={24}
                          height={24}
                        />
                      )}
                    </div>
                  ))}
            </div>
            {tweetType === "Reply2" && iconsToggle === true ? null : (
              <button className="w-fit hover:bg-white/55 anim bg-white/75 text-black font-bold text-lg py-2 px-4 rounded-full">
                {tweetType.charAt(0) === "R" ? "Reply" : "Post"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetInput;
