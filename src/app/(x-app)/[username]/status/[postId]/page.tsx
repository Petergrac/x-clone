import Feed from "@/components/Feed";
import PostInput from "@/components/PostInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const PostDetails = () => {
  return (
    <div>
      {/* Page bar */}
      <div className="flex w-full justify-between sticky top-0  items-center bg-black/50 px-4 py-4">
        <div className="justify-start flex items-center gap-5">
          <Link href={`/`}>
            <ArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold">Post</h1>
        </div>
        {/* Reply & Filters */}
        <Dialog>
          <DialogTrigger className="font-bold border-2 border-white/75 py-2 px-4 rounded-full cursor-pointer hover:bg-gray-800 anim">
            Reply
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-base">
                Replying to{" "}
                <span className="text-gray-500 text-sm">@nemesis</span>
              </DialogTitle>
              <DialogDescription className="min-h-10 max-h-32 overflow-hidden text-start">
                {/* Make sure you  */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem,
                et impedit inventore veritatis ipsa veniam aperiam
                necessitatibus iure, at dolores autem quae non deleniti. Tempora
                exercitationem sit repudiandae dolor officia? Lorem ipsum dolor,
                sit amet consectetur adipisicing elit. Quod totam magni facilis
                dolorum quidem illo voluptatum, excepturi perferendis optio
                natus saepe voluptas cupiditate laborum non ipsam quae
                consectetur repudiandae explicabo!
              </DialogDescription>
            </DialogHeader>
            <PostInput post="Reply" />
          </DialogContent>
        </Dialog>
      </div>
      <br className="pt-15" />
      
      <PostInput post="Reply" />

    </div>
  );
};

export default PostDetails;
