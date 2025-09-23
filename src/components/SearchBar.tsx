"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type SearchResult = {
  id: string;
  name: string;
  avatar: string;
  username: string; // or use `id` if slug doesn't exist
};

const ProgressiveSearch = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(input, 300);
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setUsers([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${debouncedQuery}`);
        const data = await res.json();
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleSelect = (username: string) => {
    router.push(`/dashboard/${username}`);
    setInput(""); // clear input after redirect
    setUsers([]);
  };

  return (
    <div className="relative mt-5 hover:border-sky-500 border-1 rounded-md">
      <input
        type="text"
        placeholder="Search tweets, authors..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full px-4 py-2 outline-none"
      />
      {loading && (
        <Loader2
          className="animate-spin absolute right-3 top-2.5 text-muted-foreground"
          size={18}
        />
      )}
      {users.length > 0 && (
        <div className="absolute z-10 w-full mt-1 rounded-md bg-background border shadow-lg max-h-60 overflow-auto">
          {users.map((user) => (
            <div
              onClick={() => handleSelect(user.username)}
              className="mt-3 flex items-center gap-2 cursor-pointer"
              key={user.id}
            >
              {/* AVATAR */}
              <Avatar>
                <AvatarImage
                  width={30}
                  src={user.avatar || "https://github.com/shadcn.png"}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* USER-DETAILS */}
              <div className="flex justify-start flex-col items-start">
                <h3 className="font-bold">{user.name}</h3>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressiveSearch;
