import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "./components/layout/protected.layout";
import { paths } from "./routes/paths";
import { PostsLayout } from "./components/layout/posts.layout";
import { EventsLayout } from "./components/layout/events.layout";
import { CreateBlog } from "./modules/dashboard/create-blog";

const Login = lazy(() => import("./modules/auth/login"));
const Home = lazy(() => import("./modules/dashboard/home"));
const PostsPage = lazy(() => import("./modules/dashboard/posts"));
const PostsCategory = lazy(() => import("./modules/dashboard/posts-category"));
const EventsPage = lazy(() => import("./modules/dashboard/events"));
const EventsCategory = lazy(
  () => import("./modules/dashboard/events-category")
);
const Questionnaire = lazy(() => import("./modules/dashboard/questionnaire"));
const Questions = lazy(() => import("./modules/dashboard/questions"));

function App() {
  return (
    <React.Suspense fallback={<p>Loading</p>}>
      <Routes>
        <Route path={paths.auth.login} element={<Login />} />
        <Route element={<ProtectedLayout />}>
          <Route path={paths.dashboard.home} index element={<Home />} />

          {/* Posts Layout */}
          <Route element={<PostsLayout />}>
            <Route path={paths.dashboard.blogs} element={<PostsPage />} />
            <Route
              path={paths.dashboard.blogs_category}
              element={<PostsCategory />}
            />
            <Route
              path={paths.dashboard.create_blog}
              element={<CreateBlog />}
            />
          </Route>

          {/* Events Layout */}
          <Route element={<EventsLayout />}>
            <Route path={paths.dashboard.events} element={<EventsPage />} />
            <Route
              path={paths.dashboard.events_category}
              element={<EventsCategory />}
            />
          </Route>

          <Route
            element={<Questionnaire />}
            path={paths.dashboard.questionnaires}
          />
          <Route element={<Questions />} path={paths.dashboard.quesitons} />
          <Route path="*" element={<p>ROUTE NOT FOUND</p>} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
