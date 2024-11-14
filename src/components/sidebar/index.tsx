import {
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";
import { paths } from "../../routes/paths";
import { clearUserData, clearUserToken } from "../../lib/storage";
import toast from "react-hot-toast";

export const DashboardSidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    clearUserData();
    clearUserToken();

    toast.success("Logout successful");

    setTimeout(() => {
      window.location.reload();
    }, 0);
  };

  return (
    <div className="h-full p-10 relative dark:bg-gray-900  bg-white border-r dark:border-gray-500 dark:border-opacity-40">
      <div className="py-10 mb-16">
        <h1 className=" uppercase  text-primary text-2xl font-bold">
          ClueLoop
        </h1>
      </div>

      <nav>
        <ul className="flex flex-col gap-y-12">
          {[
            {
              title: "Home",
              Icon: HomeIcon,
              path: paths.dashboard.home,
              isActive() {
                return this.path === location.pathname;
              },
            },
            {
              title: "Blogs",
              Icon: ClipboardDocumentListIcon,
              path: paths.dashboard.blogs,
              isActive() {
                return (
                  this.path === location.pathname ||
                  location.pathname === paths.dashboard.blogs_category
                );
              },
            },
            {
              title: "Events",
              Icon: CalendarDaysIcon,
              path: paths.dashboard.events,
              isActive() {
                return (
                  this.path === location.pathname ||
                  location.pathname === paths.dashboard.events_category
                );
              },
            },
          ].map((item, idx) => (
            <li key={idx}>
              <NavLink
                className={() =>
                  clsx(
                    "flex gap-x-3 items-center py-4 text-sm hover:bg-primary transition-all duration-300 hover:text-white rounded-md px-5 cursor-pointer font-semibold ",
                    item.isActive()
                      ? "text-white bg-primary"
                      : "text-primary bg-primary bg-opacity-10"
                  )
                }
                to={item.path}
              >
                <span>
                  <item.Icon className="size-4" />
                </span>
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-8 left-0 w-full px-10">
        <button
          className="bg-red-500  w-full text-white   transition duration-300 min-w-[10rem]  rounded-md px-8 py-2 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
