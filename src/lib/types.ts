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

export interface QuestionnaireType {
  id: number;
  name: string;
  description: string;
  type: "Opportunity" | "Assessment";
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
  is_published: boolean;
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

export interface QuestionType {
  id: number;
  title: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  options: {
    id: number;
    question_id: number;
    score: string;
    value: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface AnswerType {
  id: number;
  question_id: number;
  options_id: number;
  forms_id: number;
  created_at: string;
  updated_at: string;
}

export interface ClientType {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface QuestionResponseType {
  id: number;
  clients_id: number;
  status: true;
  created_at: string;
  updated_at: string;
  clients: ClientType;
  answers: AnswerType;
}
