import { Navigate, Outlet } from "react-router-dom";
import { fetchUserData, fetchUserToken } from "../../lib/storage";
import { paths } from "../../routes/paths";
import { DashboardSidebar } from "../sidebar";

export const ProtectedLayout = () => {
  const accessToken = fetchUserToken();
  const userData = fetchUserData();

  if (!accessToken || !userData) return <Navigate to={paths.auth.login} />;

  return (
    <div className="h-screen ">
      <div className="flex h-full 2xl:w-[80%] mx-auto 2xl:border-r 2xl:border-l dark:border-gray-500 dark:border-opacity-40">
        <div className="flex-[0.2]">
          <DashboardSidebar />
        </div>
        <div className="flex-[0.8] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
