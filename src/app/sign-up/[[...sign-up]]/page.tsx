"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";


export default function SignUpPage() {
  return (
    <div className="flex w-full items-center justify-around min-h-screen">
      <div className="hidden sm:flex flex-col justify-center items-center gap-5">
        <div className="">
          <p className="text-4xl font-bold">What&apos;s Happening?</p>
          <p className="text-center">
            Join other million users & <br /> explore crazy ass tweets
          </p>
        </div>
        <Image src={`/image.png`} alt="" width={50} height={50} />
      </div>
      <SignUp/>
    </div>
  );
}
