import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "./Image";
import { ScrollArea } from "./ui/scroll-area";
const ProfileDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="py-2 px-4 font-bold border-1 mt-4 rounded-full anim hover:bg-gray-800 border-gray-200 mr-3">
        Edit Profile
      </DialogTrigger>
      <DialogContent className="sm:w-[70vw] w-full">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        {/* Banner image edit */}
        <ScrollArea className="h-130">
          <div className="relative mb-20">
            <div className="aspect-[6/2] overflow-hidden relative mt-2">
              <Image
                width={600}
                height={200}
                src="/general/banner.jpeg"
                alt=""
                tr={true}
              />
            </div>
            {/* USER AVATAR */}
            <div className="object-center absolute left-4 -bottom-[72px] border-5 border-black aspect-square rounded-full">
              <Image
                src="/general/profile.jpg"
                alt=""
                width={133}
                height={133}
              />
            </div>
          </div>
          {/* Name Bio Location, Website Birth date */}
          <div className="flex flex-col gap-5">
            {/* NAME */}
            <div className="relative mt-4">
              <input
                type="text"
                id="username"
                className="border-white border focus:border-2 focus:border-sky-400 rounded-md w-full h-16 p-2 pt-6 peer outline-none"
              />
              <label
                htmlFor="username"
                className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 transition-all duration-300 peer-focus:top-1 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:-translate-y-0"
              >
                Username
              </label>
            </div>
            {/* BIO */}
            <div className="relative mt-4">
              <input
                type="text"
                id="Bio"
                className="border focus:border-2 focus:border-sky-400 rounded-md w-full h-32 p-2 pt-6 peer outline-none"
              />
              <label
                htmlFor="Bio"
                className="absolute top-6 left-2 -translate-y-1/2 text-gray-400 transition-all duration-300 peer-focus:top-2 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:-translate-y-0"
              >
                Bio
              </label>
            </div>{" "}
            {/* LOCATION */}
            <div className="relative mt-4">
              <input
                type="text"
                id="location"
                className=" border focus:border-2 focus:border-sky-400 rounded-md w-full h-16 p-2 pt-6 peer outline-none"
              />
              <label
                htmlFor="location"
                className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 transition-all duration-300 peer-focus:top-1 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:-translate-y-0"
              >
                Location
              </label>
            </div>
            {/* WEBSITE */}
            <div className="relative mt-4">
              <input
                type="text"
                id="website"
                className="border focus:border-2 focus:border-sky-400 rounded-md w-full h-16 p-2 pt-6 peer outline-none"
              />
              <label
                htmlFor="website"
                className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 transition-all duration-300 peer-focus:top-1 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:-translate-y-0"
              >
                Website
              </label>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <button className="py-2 px-4 font-bold bg-white/95 text-black rounded-full">
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
