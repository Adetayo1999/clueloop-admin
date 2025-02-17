import {
  makeAuthorizedRequestWithHeadersAndPayload,
  makeRequestWithFormData,
  makeUnauthorizedRequestWithHeadersAndPayload,
} from "./config";
import { endpoints } from "./endpoints";
import * as types from "./types";

const services = {
  async login(data: types.LoginRequestBodyType) {
    const { method, url } = endpoints.auth.login;
    return makeUnauthorizedRequestWithHeadersAndPayload(method, url, data);
  },

  // post category
  async getPostsCategory() {
    const { method, url } = endpoints.dashboard.post_category.get;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, {});
  },

  async createPostsCategory(data: types.CreatePostCategoryRequestBodyType) {
    const { method, url } = endpoints.dashboard.post_category.create;
    return makeRequestWithFormData(method, url, data, true);
  },
  async deletePostsCategory(id: number) {
    const { method, url } = endpoints.dashboard.post_category.delete;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(id), {});
  },

  async updatePostsCategory(data: types.UpdatePostCategoryRequestBodyType) {
    const { method, url } = endpoints.dashboard.post_category.update;
    return makeRequestWithFormData(method, url(data.id), data, true);
  },

  // post
  async getPosts() {
    const { method, url } = endpoints.dashboard.post.get;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url);
  },

  async getSinglePost(id: number) {
    const { method, url } = endpoints.dashboard.post.get_single;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(id));
  },

  async createPost(data: types.CreatePostRequestBodyType) {
    const { method, url } = endpoints.dashboard.post.create;
    return makeRequestWithFormData(method, url, data, true);
  },

  async editPost(data: types.EditPostRequestBodyType) {
    const { method, url } = endpoints.dashboard.post.update;
    return makeRequestWithFormData(method, url(data.id), data, true);
  },

  async deletePost(id: number) {
    const { method, url } = endpoints.dashboard.post.delete;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(id), {});
  },

  async publishPost(data: {
    title: string;
    content: string;
    category_id: number;
    user_id: number;
    id: number;
  }) {
    const { method, url } = endpoints.dashboard.post.publish;

    return makeAuthorizedRequestWithHeadersAndPayload(
      method,
      url(data.id),
      data
    );
  },

  async selectPost(data: {
    title: string;
    content: string;
    category_id: number;
    user_id: number;
    id: number;
  }) {
    const { method, url } = endpoints.dashboard.post.select;

    return makeAuthorizedRequestWithHeadersAndPayload(
      method,
      url(data.id),
      data
    );
  },

  // event category
  async getEventsCategory() {
    const { method, url } = endpoints.dashboard.event_category.get;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, {});
  },

  async createEventsCategory(data: { name: string }) {
    const { method, url } = endpoints.dashboard.event_category.create;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, data);
  },
  async deleteEventsCategory(id: number) {
    const { method, url } = endpoints.dashboard.event_category.delete;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(id), {});
  },

  async updateEventsCategory(data: types.UpdateEventCategoryRequestType) {
    const { method, url } = endpoints.dashboard.event_category.update;
    return makeAuthorizedRequestWithHeadersAndPayload(
      method,
      url(data.id),
      data
    );
  },

  // event
  async getEvents() {
    const { method, url } = endpoints.dashboard.event.get;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, {});
  },

  async createEvent(data: types.CreateEventRequestBodyType) {
    const { method, url } = endpoints.dashboard.event.create;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, data);
  },
  async deleteEvent(id: number) {
    const { method, url } = endpoints.dashboard.event.delete;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(id), {});
  },

  async updateEvent(data: types.UpdateEventRequestBodyType) {
    const { method, url } = endpoints.dashboard.event.update;
    return makeAuthorizedRequestWithHeadersAndPayload(
      method,
      url(data.id),
      data
    );
  },

  //qiestionnaire
  async getQuestionnaires() {
    const { method, url } = endpoints.dashboard.questionnaire.get;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, {});
  },

  async getAllQuestionnaireQuestions(id: number) {
    const { method, url } = endpoints.dashboard.questionnaire.get_all_questions;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(id), {});
  },

  async getSingleQuestionnaire(id: number) {
    const { method, url } = endpoints.dashboard.questionnaire.get_single;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(id), {});
  },

  async createQuestionnaires(data: types.CreateQuestionnaireRequestBodyType) {
    const { method, url } = endpoints.dashboard.questionnaire.create;
    return makeRequestWithFormData(method, url, data, true);
  },
  async deleteQuestionnaire(id: number) {
    const { method, url } = endpoints.dashboard.questionnaire.delete;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(id), {});
  },

  async updateQuestionnaire(data: types.EditQuestionnaireRequestBodyType) {
    const { method, url } = endpoints.dashboard.questionnaire.update;
    return makeRequestWithFormData(method, url(data.id), data, true);
  },

  //qiestionnaire
  async getQuestion() {
    const { method, url } = endpoints.dashboard.question.get;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, {});
  },

  async createQuestion(data: types.CreateQuestionRequestBodyType) {
    const { method, url } = endpoints.dashboard.question.create;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, data);
  },
  async deleteQuestion(id: number) {
    const { method, url } = endpoints.dashboard.question.delete;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(id), {});
  },

  async updateQuestion(data: types.EditQuestionRequestBodyType) {
    const { method, url } = endpoints.dashboard.question.update;
    return makeAuthorizedRequestWithHeadersAndPayload(
      method,
      url(data.id),
      data
    );
  },

  async getQuestionnaireQualifier() {
    const { method, url } = endpoints.dashboard.qualify.get;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, {});
  },

  async createQuestionnaireQualifier(
    data: types.CreateQuestionnaireQualifierRequestBodyType
  ) {
    const { method, url } = endpoints.dashboard.qualify.create;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, data);
  },
  async deleteQuestionnaireQualifer(id: number) {
    const { method, url } = endpoints.dashboard.qualify.delete;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(id), {});
  },

  async updateQuestionnaireQualifer(
    data: types.EditQuestionnaireQualiferRequestBodyType
  ) {
    const { method, url } = endpoints.dashboard.qualify.update;
    return makeAuthorizedRequestWithHeadersAndPayload(
      method,
      url(data.id),
      data
    );
  },

  async getSubmittedResponses(category_id: number) {
    const { method, url } = endpoints.dashboard.forms.get_submitted;

    return makeAuthorizedRequestWithHeadersAndPayload(
      method,
      url(category_id),
      {}
    );
  },

  async getNewsletterSubmissions() {
    const { method, url } = endpoints.dashboard.newsletter.get;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, {});
  },

  async getOpportunities() {
    const { method, url } = endpoints.dashboard.opportunity.get;

    return makeAuthorizedRequestWithHeadersAndPayload(method, url, {});
  },

  async getSingleOpportunity(id: number) {
    const { method, url } = endpoints.dashboard.opportunity.get_single;
    return makeAuthorizedRequestWithHeadersAndPayload(
      method,
      url(id.toString()),
      {}
    );
  },

  async createOpportunity(data: types.CreateOpportunityRequestBodyType) {
    const { method, url } = endpoints.dashboard.opportunity.create;
    return makeRequestWithFormData(method, url, data, true);
  },

  async updateOpportunity(data: types.EditOpportunityRequestBodyType) {
    const { method, url } = endpoints.dashboard.opportunity.update;
    return makeRequestWithFormData(method, url(data.id.toString()), data, true);
  },

  async deleteOpportunities(id: number) {
    const { method, url } = endpoints.dashboard.opportunity.delete;
    return makeAuthorizedRequestWithHeadersAndPayload(
      method,
      url(id.toString()),
      {}
    );
  },
};

export default services;
