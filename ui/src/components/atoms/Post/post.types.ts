export interface IPost {
  id: string;
  data: string;
  author: string;
  timestamp: number;
  upvotes: number;
}

export interface IPostProps {
  post: IPost;
}
