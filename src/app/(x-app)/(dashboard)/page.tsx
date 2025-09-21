"use client";
import Feed from "@/components/Feed";
import HomeHeader from "@/components/HomeHeader";
import { useEffect, useState } from "react";
import { TweetInteraction } from "@/types/tweet";
export default function Home() {
  const [isFollowing, setIsFollowing] = useState(true);
  const [tweets, setTweets] = useState<TweetInteraction[] | null>(null);
  // Fetch the data
  useEffect(() => {
    async function getTweets() {
      try {
        const res = await fetch(`/api/homefeed?feedType=${isFollowing}`);
        const data = await res.json();
        setTweets(data);
      } catch (error) {
        console.log(error);
      }
    }
    getTweets();
  }, [isFollowing]);

  return (
    <div>
      {/* Post Creation Section */}
      <HomeHeader isRelated={{ isFollowing, setIsFollowing }} />
      {/* Personalized posts */}
      {tweets &&
        tweets.map((tweet) => (
          <Feed
            key={tweet.id}
            tweet={tweet}
            hasLiked={tweet.likes && tweet.likes?.length > 0}
          />
        ))}
    </div>
  );
}
