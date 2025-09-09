import Feed from "@/components/Feed";
import HomeHeader from "@/components/HomeHeader";

export default function Home() {
  return (
    <div className="md:w-150 w-90 border-x-1 overflow-y-auto min-h-screen">
      {/* Post Creation Section */}
      <HomeHeader />
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
