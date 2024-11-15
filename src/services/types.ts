export interface LoginRequestBodyType {
  email: string;
  password: string;
}

export interface RegisterRequestBodyType extends LoginRequestBodyType {
  name: string;
  password_confirmation: string;
}

export interface CreatePostRequestBodyType {
  title: string;
  content: string;
  category_id: number;
  user_id: number;
  banner: File | string;
}

export interface EditPostRequestBodyType {
  title: string;
  content: string;
  category_id: number;
  user_id: number;
  id: number;
  banner?: File | string;
  _method: "put";
}

export interface CreateEventRequestBodyType {
  title: string;
  content: string;
  category_id: number;
  user_id: number;
}
