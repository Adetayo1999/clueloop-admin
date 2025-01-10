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
  banner: File;
  authors: string;
  snippets: string;
  action_text?: string;
  question_category_id?: number;
}

export interface CreatePostCategoryRequestBodyType {
  name: string;
  description: string;
  banner?: File;
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
  action_text?: string;
  question_category_id?: number;
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
  banner: File;
  type: "Opportunity" | "Assessment";
}

export interface EditQuestionnaireRequestBodyType {
  name: string;
  description: string;
  id: number;
  _method: "put";
  banner?: File;
  type: "Opportunity" | "Assessment";
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

export interface CreateQuestionnaireQualifierRequestBodyType {
  description: string;
  action?: string | null;
  maximum_percentage: string;
  minimum_percentage: string;
  category_id: number;
  action_text: string;
  oppurtunity_id?: string | null;
}

export interface EditQuestionnaireQualiferRequestBodyType
  extends CreateQuestionnaireQualifierRequestBodyType {
  id: number;
  _method: "put";
}

export interface CreateOpportunityRequestBodyType {
  title: string;
  content: string;
  action_link: string;
  document_link: string;
  banner: File;
  snippets: string;
}

export interface EditOpportunityRequestBodyType
  extends Omit<CreateOpportunityRequestBodyType, "banner"> {
  id: number;
  _method: "put";
  banner?: File;
}
