

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import PostInput from "./PostInput";


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
      <h1 className="text-2xl font-bold text-center py-4 sm:hidden">X-Clone</h1>
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
      <PostInput post='Post'/>
    </div>
  );
};

export default HomeHeader;
