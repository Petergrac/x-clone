import PostFilter from "@/components/PostFilter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";

export default function Home() {
  return (
    <div className="md:w-150 w-90 border-x-1">
      {/* NAVBAR */}
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
      <div className="w-full flex items-center">
        {/* AVATAR */}
        <div className="p-5">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        {/* SECTION 2 */}
        <div className="flex grow">
          {/* INPUT & PERSONALIZATION */}
          <div className="flex flex-col flex-1">
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
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}
