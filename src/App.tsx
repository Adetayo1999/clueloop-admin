import React, { lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "./components/layout/protected.layout";
import { paths } from "./routes/paths";
import { PostsLayout } from "./components/layout/posts.layout";
import { EventsLayout } from "./components/layout/events.layout";
import { CreateBlog } from "./modules/dashboard/create-blog";
import { QuestionnaireLayout } from "./components/layout/questionnaire.layout";

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
const QuestionnaireResponses = lazy(
  () => import("./modules/dashboard/questionnaire-responses")
);
const QuestionnaireQualifier = lazy(
  () => import("./modules/dashboard/qualifier")
);
const NewsletterPage = lazy(() => import("./modules/dashboard/newsletter"));
const OpportunitiesPage = lazy(
  () => import("./modules/dashboard/opportunities")
);
const CreateOpportunityPage = lazy(
  () => import("./modules/dashboard/create-opportunity")
);

function App() {
  return (
    <Routes>
      <Route path={paths.auth.login} element={<Login />} />
      <Route element={<ProtectedLayout />}>
        <Route
          element={
            <React.Suspense fallback={<p>Loading....</p>}>
              <NewsletterPage />
            </React.Suspense>
          }
          path={paths.dashboard.newsletter}
        />
        <Route
          path={paths.dashboard.home}
          index
          element={
            <React.Suspense fallback={<p>Loading....</p>}>
              <Home />
            </React.Suspense>
          }
        />

        {/* Posts Layout */}
        <Route element={<PostsLayout />}>
          <Route
            path={paths.dashboard.blogs}
            element={
              <React.Suspense fallback={<p>Loading....</p>}>
                <PostsPage />
              </React.Suspense>
            }
          />
          <Route
            path={paths.dashboard.blogs_category}
            element={
              <React.Suspense fallback={<p>Loading....</p>}>
                <PostsCategory />
              </React.Suspense>
            }
          />
          <Route
            path={paths.dashboard.create_blog}
            element={
              <React.Suspense fallback={<p>Loading....</p>}>
                <CreateBlog />
              </React.Suspense>
            }
          />
        </Route>

        {/* Opportunity Layout */}
        <Route element={<Outlet />}>
          <Route
            path={paths.dashboard.create_opportunity}
            element={
              <React.Suspense fallback={<p>Loading....</p>}>
                <CreateOpportunityPage />
              </React.Suspense>
            }
          />
          <Route
            path={paths.dashboard.opportunities}
            element={
              <React.Suspense fallback={<p>Loading....</p>}>
                <OpportunitiesPage />
              </React.Suspense>
            }
          />
        </Route>

        {/* Events Layout */}
        <Route element={<EventsLayout />}>
          <Route
            path={paths.dashboard.events}
            element={
              <React.Suspense fallback={<p>Loading....</p>}>
                <EventsPage />
              </React.Suspense>
            }
          />
          <Route
            path={paths.dashboard.events_category}
            element={
              <React.Suspense fallback={<p>Loading....</p>}>
                <EventsCategory />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<QuestionnaireLayout />}>
          <Route
            element={
              <React.Suspense fallback={<p>Loading....</p>}>
                <Questionnaire />
              </React.Suspense>
            }
            path={paths.dashboard.questionnaires}
          />
          <Route
            element={
              <React.Suspense fallback={<p>Loading....</p>}>
                <Questions />
              </React.Suspense>
            }
            path={paths.dashboard.quesitons}
          />
          <Route
            element={
              <React.Suspense fallback={<p>Loading....</p>}>
                <QuestionnaireResponses />
              </React.Suspense>
            }
            path={paths.dashboard.responses}
          />
          <Route
            element={
              <React.Suspense fallback={<p>Loading....</p>}>
                <QuestionnaireQualifier />
              </React.Suspense>
            }
            path={paths.dashboard.qualifiers}
          />
        </Route>
        <Route path="*" element={<p>ROUTE NOT FOUND</p>} />
      </Route>
    </Routes>
  );
}

export default App;
