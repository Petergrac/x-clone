import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PostInput from "./PostInput";

type UserType = {
  avatar: string | null;
  username: string | null;
};

const HomeHeader = ({
  isRelated,
}: {
  isRelated: {
    isFollowing: boolean;
    setIsFollowing: Dispatch<SetStateAction<boolean>>;
  };
}) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/username");
        const data = (await res.json()) as UserType;
        setUser(data); // store in state for rendering
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }
    fetchUser();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center py-4 sm:hidden">X-Clone</h1>
      <nav className="w-fullgap-4 flex justify-between md:justify-around border-b sm:sticky fixed top-0 z-10 bg-black/50  px-4">
        <Link
          href="/"
          className={`${
            isRelated.isFollowing &&
            "font-extrabold underline underline-offset-12 decoration-5 pb-3 decoration-sky-600"
          } hover:bg-white/15 flex-1 text-center  pt-5 `}
          onClick={() => isRelated.setIsFollowing(true)}
        >
          For you
        </Link>
        <Link
          href={`/`}
          className={`${
            !isRelated.isFollowing &&
            "font-extrabold underline underline-offset-12 decoration-5 pb-3 decoration-sky-600"
          } flex-1  pt-5 text-center hover:bg-white/15`}
          onClick={() => isRelated.setIsFollowing(false)}
        >
          Following
        </Link>
      </nav>
      {/* POST INPUT */}
      {user && <PostInput post="Post" user={user} />}
    </div>
  );
};

export default HomeHeader;
