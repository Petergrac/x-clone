"use client";
import TweetFilter from "@/components/TweetFilter";
import Image from "./Image";
import Link from "next/link";
import { useState } from "react";
import UploadExample from "./ImageUpload";
import TestImage from "next/image";
import { RectangleHorizontal, Square } from "lucide-react";

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
  const [image, setImage] = useState<File | undefined>(undefined);
  const [cropType, setCrop] = useState<"Video" | "Square" | null>(null);
  // Set image review
  const handleImageEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="w-full flex items-start border-t mt-10 relative">
        {image && (
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black/70 z-50 flex
          flex-col items-center justify-center"
          >
            <div className="w-full flex justify-end pr-1">
              <p
                onClick={() => setImage(undefined)}
                className="px-4 py-2 cursor-pointer font-bold  hover:bg-muted-foreground aspect-square rounded-full"
              >
                X
              </p>
            </div>
            <div
              className={`relative ${
                cropType === "Video"
                  ? "aspect-video w-200 h-112 overflow-hidden"
                  : cropType === "Square"
                  ? "aspect-square w-150 h-150 overflow-hidden"
                  : " aspect-video w-200 h-112 overflow-hidden"
              }`}
            >
              <TestImage
                src={URL.createObjectURL(image)}
                alt="Preview"
                fill // Maintain aspect ratio (e.g. 16:9 for 800x450)
                className="object-center overflow-hidden"
              />
            </div>
            {/* IMAGES CROPPING */}
            <div className="flex justify-around w-full my-4">
              <div
                onClick={() => setCrop("Square")}
                className={`${
                  cropType === "Square" && "text-sky-400"
                } flex flex-col items-center`}
              >
                <Square />
                <p className="">Square</p>
              </div>
              <div
                onClick={() => setCrop("Video")}
                className={`${
                  cropType === "Video" && "text-sky-400"
                } flex flex-col items-center`}
              >
                <RectangleHorizontal />
                <p className="">Video</p>
              </div>
            </div>
            {/* SAVE & SENSITIVE BUTTONS */}
            <div className="w-full justify-around flex my-4">
              <button className="border rounded-full font-bold bg-white/74 text-black px-5 py-2">
                Save
              </button>
              <button className="border rounded-full font-bold bg-red-500 text-black px-5 py-2">
                sensitive
              </button>
            </div>
          </div>
        )}

        {/* AVATAR */}
        <Link href={`/${user?.username}`} className="p-5">
          <div className="rounded-full overflow-hidden">
            <Image
              src={user?.avatar || "https://github.com/shadcn.png"}
              alt=""
              width={44}
              height={44}
            />
          </div>
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
                            id="image"
                            onChange={(e) => handleImageEdit(e)}
                          />
                          {/* <UploadExample setImage={setImage} /> */}
                        </label>
                      ) : (
                        <div className="hover:bg-sky-500/55 rounded-full anim">
                          <Image src={icon} alt="" width={24} height={24} />
                        </div>
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
