"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState } from "react";
import { followActions, userActions } from "@/app/_actions/userQueries";
import { toast } from "sonner";

interface currentUserType {
  id: string;
  username: string;
  banner: string | null;
  location: string | null;
  website: string | null;
  avatar: string | null;
}
const ProfileDialog = ({ username }: { username: string | undefined }) => {
  const [userDetails, setDetails] = useState<
    currentUserType | null | true | false
  >(null);
  const [hasFollowed, setHasFollowed] = useState(true);
  const [userData, setUserData] = useState({
    username: "",
    location: "",
    website: "",
  });
  useEffect(() => {
    if (username) {
      const handleUserDetails = async () => {
        try {
          const res = await fetch(`/api/user-details?username=${username}`);
          const userDetails = (await res.json()) as
            | currentUserType
            | null
            | true
            | false;
          setDetails(userDetails);
          if (
            userDetails !== null &&
            (userDetails === true || userDetails === false)
          ) {
            setHasFollowed(userDetails);
          }
        } catch (error) {
          console.log(error);
        }
      };
      handleUserDetails();
    }
  }, [username]);

  if (userDetails === null || userDetails === true || userDetails === false) {
    const handleFollows = async () => {
      if (username) {
        // Follow or unfollow
        const response = await followActions(username);
        if (response == true || response === false) setHasFollowed(response);
        else toast.error(response);
      }
    };
    return (
      <button
        onClick={handleFollows}
        className={`${
          hasFollowed
            ? "outline outline-white text-white"
            : "bg-white text-black"
        } mt-4 mr-5 anim rounded-full py-2 px-4`}
      >
        {hasFollowed === true ? "Unfollow" : "Follow"}
      </button>
    );
  }
  //
  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const submitUpdate = async () => {
    try {
      await userActions(userData);
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };
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
                src={userDetails.banner!}
                alt=""
              />
            </div>
            {/* USER AVATAR */}
            <div className="object-center absolute left-4 -bottom-[72px] border-5 border-black aspect-square rounded-full">
              <Image
                src={userDetails.avatar!}
                alt=""
                className="rounded-full"
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
                defaultValue={userData.username || userDetails.username}
                onChange={(e) => handleDataChange(e)}
                className="border-white border focus:border-2 focus:border-sky-400 rounded-md w-full h-16 p-2 pt-6 peer outline-none"
              />
              <label
                htmlFor="username"
                className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 transition-all duration-300 peer-focus:top-1 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:-translate-y-0"
              >
                Username
              </label>
            </div>
            {/* LOCATION */}
            <div className="relative mt-4">
              <input
                type="text"
                id="location"
                defaultValue={userData.location! || userDetails.location!}
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
                defaultValue={userData.website! || userDetails.website!}
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
          <button
            onClick={submitUpdate}
            className="py-2 px-4 font-bold bg-white/95 text-black rounded-full"
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
