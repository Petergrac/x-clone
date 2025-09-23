"use client";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";


export default function SignInPage() {
  return (
    <div className="bg-black flex-col h-screen flex w-full flex-1 items-center justify-center p-6 md:p-10">
      <div className="mx-auto my-10 flex flex-col justify-center items-center gap-5">
        <div className="">
          <p className="text-4xl font-bold">What&apos;s Happening?</p>
          <p className="text-center">
            Join other million users & <br /> explore crazy ass tweets
          </p>
        </div>
        <Image src={`/image.png`} alt="" width={50} height={50} />
      </div>
     <SignIn  />
    </div>
  );
}
