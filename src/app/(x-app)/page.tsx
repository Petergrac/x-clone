"use client"
import Feed from "@/components/Feed";
import HomeHeader from "@/components/HomeHeader";
import { useState } from "react";

export default function Home() {
  const[related, setRelated] = useState(false);
  return (
    <div >
      {/* Post Creation Section */}
      <HomeHeader isRelated={{related, setRelated}} />
      {/* Personalized posts */}
      <Feed />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
      <Feed />
    </div>
  );
}
