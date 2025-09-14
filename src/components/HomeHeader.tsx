import PostFilter from "@/components/PostFilter";
import Image from "next/image";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
const media = [
  "/icons/image.svg",
  "/icons/gif.svg",
  "/icons/poll.svg",
  "/icons/emoji.svg",
  "/icons/schedule.svg",
  "/icons/userLocation.svg",
];

const HomeHeader = ({
  isRelated,
}: {
  isRelated: {
    related: boolean;
    setRelated: Dispatch<SetStateAction<boolean>>;
  };
}) => {
  return (
    <div>
      <nav className="w-full pt-5 flex justify-between md:justify-around border-b sm:sticky fixed top-0 z-10 bg-black/50  px-4">
        <Link
          href="/"
          className={`${
            isRelated.related && "font-extrabold border-b-4 border-sky-600"
          }`}
          onClick={() => isRelated.setRelated(true)}
        >
          For you
        </Link>
        <Link
          href={`/`}
          className={`${
            !isRelated.related && "font-extrabold border-b-4 border-sky-600"
          }`}
          onClick={() => isRelated.setRelated(false)}
        >
          Following
        </Link>
      </nav>
      {/* POST INPUT */}
      <div className="w-full flex items-start border-b mt-10">
        {/* AVATAR */}
        <Link href="/username" className="p-5">
          <Image
            src="https://github.com/shadcn.png"
            alt=""
            width={44}
            height={44}
            className="rounded-full overflow-hidden"
          />
        </Link>
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
