export const endpoints = {
  auth: {
    login: {
      method: "POST",
      url: "/login",
    },
    register: {
      method: "POST",
      url: "/register",
    },
  },

  dashboard: {
    post_category: {
      create: {
        method: "POST",
        url: "/post-categories",
      },
      update: {
        method: "POST",
        url: (id: number) => `/post-categories/${id}`,
      },
      delete: {
        method: "DELETE",
        url: (id: number) => `/post-categories/${id}`,
      },
      get: {
        method: "GET",
        url: "/post-categories",
      },
    },
    event_category: {
      create: {
        method: "POST",
        url: "/event-categories",
      },
      update: {
        method: "POST",
        url: (id: number) => `/event-categories/${id}`,
      },
      delete: {
        method: "DELETE",
        url: (id: number) => `/event-categories/${id}`,
      },
      get: {
        method: "GET",
        url: "/event-categories",
      },
    },
    post: {
      get: {
        method: "GET",
        url: "/posts",
      },
      get_single: {
        method: "GET",
        url: (id: number) => `/posts/${id}`,
      },
      create: {
        method: "POST",
        url: "/posts",
      },
      delete: {
        method: "DELETE",
        url: (id: number) => `/posts/${id}`,
      },
      update: {
        method: "POST",
        url: (id: number) => `/posts/${id}`,
      },
      publish: {
        method: "PUT",
        url: (id: number) => `/posts/publish/${id}`,
      },
      select: {
        method: "PUT",
        url: (id: number) => `/posts/selected/${id}`,
      },
    },
    event: {
      get: {
        method: "GET",
        url: "/events",
      },
      create: {
        method: "POST",
        url: "/events",
      },
      update: {
        method: "POST",
        url: (id: number) => `/events/${id}`,
      },
      delete: {
        method: "DELETE",
        url: (id: number) => `/events/${id}`,
      },
    },
    questionnaire: {
      get: {
        method: "GET",
        url: "/question-categories",
      },
      create: {
        method: "POST",
        url: "/question-categories",
      },
      get_single: {
        method: "GET",
        url: (id: number) => `/question-categories/${id}`,
      },
      update: {
        method: "POST",
        url: (id: number) => `/question-categories/${id}`,
      },
      delete: {
        method: "DELETE",
        url: (id: number) => `/question-categories/${id}`,
      },
      get_all_questions: {
        method: "GET",
        url: (id: number) => `/questions/get/category/${id}`,
      },
    },
    question: {
      get: {
        method: "GET",
        url: "/questions",
      },
      create: {
        method: "POST",
        url: "/questions",
      },
      update: {
        method: "POST",
        url: (id: number) => `/questions/${id}`,
      },
      delete: {
        method: "DELETE",
        url: (id: number) => `/questions/${id}`,
      },
    },
    forms: {
      get_submitted: {
        method: "GET",
        url: (id: number) => `/forms/get/submitted/${id}`,
      },
    },
    qualify: {
      get: {
        method: "GET",
        url: "/qualify",
      },
      create: {
        method: "POST",
        url: "/qualify",
      },
      get_single: {
        method: "GET",
        url: (id: number) => `/qualify/${id}`,
      },
      update: {
        method: "POST",
        url: (id: number) => `/qualify/${id}`,
      },
      delete: {
        method: "DELETE",
        url: (id: number) => `/qualify/${id}`,
      },
    },
    newsletter: {
      get: {
        method: "GET",
        url: "/news-letter",
      },
    },
    opportunity: {
      get: {
        method: "GET",
        url: "/oppurtunity",
      },
      create: {
        method: "POST",
        url: "/oppurtunity",
      },
      get_single: {
        method: "GET",
        url: (id: string) => `/oppurtunity/admin/${id}`,
      },
      update: {
        method: "POST",
        url: (id: string) => `/oppurtunity/${id}`,
      },
      delete: {
        method: "DELETE",
        url: (id: string) => `/oppurtunity/${id}`,
      },
    },
  },
};
