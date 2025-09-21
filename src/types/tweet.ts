export type TweetInteraction = {
  id: string;
  content: string | null;
  authorId: string;
  parentId: string | null;
  createdAt: Date;
  image: string | null;
  isSensitive: boolean;
  author: {
    username: string;
    id: string;
    avatar: string | null;
    name?: string; // only available in liked tweets
  };
  _count: {
    replies: number;
    retweets: number;
    likes: number;
  };
  likes: { id: string }[];
  retweets: { id: string }[];
  // Optional metadata to know where it came from
  interactionType?: string;
  likedAt?: string; // if it's a liked tweet
};
