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

  async createPostsCategory(data: { name: string }) {
    const { method, url } = endpoints.dashboard.post_category.create;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, data);
  },
  async deletePostsCategory(id: number) {
    const { method, url } = endpoints.dashboard.post_category.delete;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(id), {});
  },

  async updatePostsCategory(data: { id: number; name: string }) {
    const { method, url } = endpoints.dashboard.post_category.update;
    return makeAuthorizedRequestWithHeadersAndPayload(
      method,
      url(data.id),
      data
    );
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

  async updateEventsCategory(data: { id: number; name: string }) {
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

  async updateEvent(data: types.CreateEventRequestBodyType & { id: number }) {
    const { method, url } = endpoints.dashboard.event.update;
    return makeAuthorizedRequestWithHeadersAndPayload(
      method,
      url(data.id),
      data
    );
  },
};

export default services;
