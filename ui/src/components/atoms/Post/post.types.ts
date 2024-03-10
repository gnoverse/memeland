// temporary
export interface IPost {
  id: string;
  image: string;
  author: string;
  date: Date;
  upvotes: number;
}

export interface IPostProps {
  post: IPost;
}
