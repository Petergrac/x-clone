import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
const menuList = [
  { id: 1, name: "Homepage", link: "/", icon: "home.svg" },
  { id: 2, name: "Explore", link: "/", icon: "explore.svg" },
  { id: 4, name: "Messages", link: "/", icon: "message.svg" },
  { id: 5, name: "Bookmarks", link: "/", icon: "bookmark.svg" },
  { id: 6, name: "Jobs", link: "/", icon: "job.svg" },
  { id: 7, name: "Communities", link: "/", icon: "community.svg" },
  { id: 8, name: "Premium", link: "/", icon: "logo.svg" },
  { id: 9, name: "Profile", link: "/", icon: "profile.svg" },
  { id: 10, name: "More", link: "/", icon: "more.svg" },
];

const LeftBar = () => {
  return (
    <div className="h-screen sticky top-0 hidden sm:flex flex-col justify-between pt-2 pb-8 pr-2">
      {/* LOGO MENU BUTTON */}
      <div className="flex flex-col gap-4 items-center text-lg 2xl:items-start">
        <Link
          className="rounded-full flex relative hover:bg-[#181818] items-center gap-4 px-2 xl:pr-5"
          href="/"
        >
          <svg
            fill="#fff"
            width="24px"
            height="24px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>twitter</title>
            <path d="M30.917 6.728c-1.026 0.465-2.217 0.805-3.464 0.961l-0.061 0.006c1.268-0.771 2.222-1.952 2.687-3.354l0.013-0.044c-1.124 0.667-2.431 1.179-3.82 1.464l-0.082 0.014c-1.123-1.199-2.717-1.946-4.485-1.946-3.391 0-6.14 2.749-6.14 6.14 0 0.496 0.059 0.979 0.17 1.441l-0.008-0.042c-5.113-0.254-9.613-2.68-12.629-6.366l-0.025-0.031c-0.522 0.873-0.831 1.926-0.831 3.052 0 0.013 0 0.026 0 0.039v-0.002c0 0.001 0 0.003 0 0.005 0 2.12 1.075 3.989 2.709 5.093l0.022 0.014c-1.026-0.034-1.979-0.315-2.811-0.785l0.031 0.016v0.075c0 0.001 0 0.002 0 0.002 0 2.961 2.095 5.434 4.884 6.014l0.040 0.007c-0.484 0.135-1.040 0.212-1.614 0.212-0.406 0-0.802-0.039-1.186-0.113l0.039 0.006c0.813 2.459 3.068 4.212 5.739 4.264l0.006 0c-2.072 1.638-4.721 2.627-7.602 2.627-0.005 0-0.009 0-0.014 0h0.001c-0.515-0.001-1.022-0.031-1.521-0.089l0.061 0.006c2.663 1.729 5.92 2.757 9.418 2.757 0.005 0 0.009 0 0.014 0h-0.001c0.037 0 0.082 0 0.126 0 9.578 0 17.343-7.765 17.343-17.343 0-0.039-0-0.077-0-0.116l0 0.006c0-0.262 0-0.524-0.019-0.786 1.21-0.878 2.229-1.931 3.042-3.136l0.028-0.044z"></path>
          </svg>
          <p className="xl:inline hidden">X - Clone</p>
        </Link>
        {/* MENU LIST */}
        <div className="flex flex-col">
          {menuList.map((item, i) => (
            <div key={item.name + i}>
              <Link
                href={item.link}
                className="p-2 rounded-full hover:bg-[#181818] flex items-center gap-4"
                key={item.id}
              >
                <Image
                  src={`/icons/${item.icon}`}
                  width={24}
                  height={24}
                  alt=""
                />
                <p className="hidden xl:inline text-white/75">{item.name}</p>
              </Link>
            </div>
          ))}
        </div>
        {/* BUTTON */}
        <Link
          href="/compose/post"
          className=" bg-white/75 w-12 px-2 h-12 text-black rounded-full xl:hidden  flex items-center justify-center"
        >
          <Image src="/icons/post.svg" width={27} height={27} alt="" />
        </Link>
        <Link
          href="/compose/post"
          className="hidden xl:block font-bold bg-white/75 text-black rounded-full py-2 px-20"
        >
          Post
        </Link>
      </div>

      {/* USER */}
      <div className="flex items-center justify-between anim hover:bg-muted-foreground/35 cursor-pointer rounded-full p-2">
        <div className="flex gap-1 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="xl:flex hidden  flex-col items-center justify-center">
            <span className="text-sm font-bold">Apostle254</span>
            <span className="text-sm font-extralight">@apostle254</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="hidden xl:block cursor-pointer font-bold">...</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60 shadow-white/25 p-3 bg-black shadow-md">
            <DropdownMenuItem className="font-bold text-[14px]">
              <Link href="/login">Add an existing account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="font-bold text-[14px]">
              <Link href="/logout">Log out @apostle254</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default LeftBar;
