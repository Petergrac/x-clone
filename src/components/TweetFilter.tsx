import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Earth,  UserCircle2Icon } from "lucide-react";
const TweetFilter = () => {
  return (
    <Select>
      <SelectTrigger className="outline-none border-0 bg-black">
        <SelectValue className="bg-black" placeholder="Everyone can reply" />
      </SelectTrigger>
      <SelectContent className="bg-black outline-none border-0 p-3 shadow-white/35 shadow-lg">
        <SelectGroup>
          <SelectLabel>Who can reply?</SelectLabel>
          <SelectLabel>
            Choose who can reply to this post.
            <br />
            Anyone mentioned can always reply.
          </SelectLabel>
          <div className="flex flex-col gap-4">
            <SelectItem
              value="everyone"
              defaultChecked
              className="flex items-center gap-2 text-lg font-bold"
            >
              <Earth className="p-1 bg-sky-400 rounded-full w-15" /> Everyone
            </SelectItem>
            <SelectItem
              value="following"
              className="flex items-center gap-2 text-lg font-bold"
            >
              <UserCircle2Icon className="p-1 bg-sky-400 rounded-full w-15" />{" "}
              Accounts you follow
            </SelectItem>
            <SelectItem
              value="verified"
              className="flex items-center gap-2 text-lg font-bold"
            >
              <UserCircle2Icon className="p-1 bg-sky-400 rounded-full w-15" />{" "}
              Verified accounts
            </SelectItem>
            <SelectItem
              value="mentioned"
              className="flex items-center gap-2 text-lg font-bold"
            >
              <UserCircle2Icon className="p-1 bg-sky-400 rounded-full w-15" />{" "}
              Only accounts you mention
            </SelectItem>
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TweetFilter;
