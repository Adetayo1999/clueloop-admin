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

export interface CreatePostCategoryRequestBodyType {
  name: string;
  description: string;
  banner: File | string;
}

export interface UpdatePostCategoryRequestBodyType {
  name: string;
  description: string;
  id: number;
  banner?: File;
  _method: "put";
}

export interface EditPostRequestBodyType {
  title: string;
  content: string;
  category_id: number;
  user_id: number;
  id: number;
  banner?: File;
  _method: "put";
}

export interface UpdateEventCategoryRequestType {
  id: number;
  name: string;
  _method: "put";
}

export interface CreateEventRequestBodyType {
  title: string;
  content: string;
  category_id: number;
  user_id: number;
}

export interface UpdateEventRequestBodyType {
  title: string;
  content: string;
  category_id: number;
  user_id: number;
  _method: "put";
  id: number;
}

export interface CreateQuestionnaireRequestBodyType {
  name: string;
  description: string;
  type: "Opportunity" | "Assessment";
}

export interface EditQuestionnaireRequestBodyType {
  name: string;
  description: string;
  type: "Opportunity" | "Assessment";
  id: number;
  _method: "put";
}

export interface CreateQuestionRequestBodyType {
  title: string;
  category_id: number;
  options: { value: string; score: string }[];
}

export interface EditQuestionRequestBodyType {
  title: string;
  category_id: number;
  options: { value: string; score?: string; id: number }[];
  id: number;
  _method: "put";
}
