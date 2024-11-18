export interface PostCategoryType {
  id: number;
  name: string;
  description: string;
  banner: string;
  created_at: string;
  updated_at: string;
}

export interface EventCategoryType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface UserDataType {
  id: number;
  name: string;
  email: string;
}

export interface PostType {
  id: number;
  title: string;
  content: string;
  category_id: number;
  user_id: number;
  banner: string;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface EventType {
  id: number;
  title: string;
  content: string;
  category_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}
