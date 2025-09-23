"use client";
import Link from "next/link";
import { redirect, useParams, usePathname } from "next/navigation";

const UserPostNav = () => {
  const pathname = usePathname();
 const params = useParams();
 const base = params.username as string;
 if(!base) redirect('/dashboard');
  // Extract the base path (e.g., '/user/username')
  const activeLinkClasses = "decoration-blue-500  underline underline-offset-6 decoration-3";
  const inactiveLinkClasses = "text-gray-500";
  return (
    <nav className="flex justify-between mx-4 mt-4 font-bold text-lg mb-4">
      <Link 
        href={`/dashboard/${base}/`}
        className={pathname === `/dashboard/${base}` ? activeLinkClasses : inactiveLinkClasses}
      >
        Posts
      </Link>
      <Link 
        href={`/dashboard/${base}/replies`}
        className={pathname === `/dashboard/${base}/replies` ? activeLinkClasses : inactiveLinkClasses}
      >
        Replies
      </Link>
      <Link 
        href={`/dashboard/${base}/likes`}
        className={pathname === `/dashboard/${base}/likes` ? activeLinkClasses : inactiveLinkClasses}
      >
        Likes
      </Link>
    </nav>
  );
};

export default UserPostNav;