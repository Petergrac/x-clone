import Feed from "@/components/Feed";
import UserDetails from "@/components/UserDetails";
import UserPostNav from "@/components/UserPostNav";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const UserPosts = () => {
  return (
    <div>
      <div className="">
        {/* NAME, NUMBER OF POSTS */}
        <div className="flex items-center gap-4 ml-3 mt-3">
          <Link
            href={`/`}
            className="hover:bg-gray-800 aspect-square p-2 rounded-full"
          >
            <ArrowLeftIcon />
          </Link>
          {/* Name & Number of posts */}
          <div className="flex flex-col justify-start">
            <p className="text-2xl font-bold">ℕΣΜΣЅℐЅ</p>
            <p className="text-sm text-muted-foreground">329 posts</p>
          </div>
        </div>
        {/* BANNER  & USER DETAILS*/}
        <div>
          <UserDetails />
        </div>
        {/* NAV MENU TO NAVIGATE WITH DIFFERENT FILTERS */}
        <div className="">
          <UserPostNav />
        </div>
      </div>{" "}

      <Feed />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
    </div>
  );
};

export default UserPosts;
