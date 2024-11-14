import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { paths } from "../../routes/paths";
import clsx from "clsx";
import { Button } from "../button";
import { useModal } from "../../context/modal";
import { CreatePostCategory } from "../modals/create-post-category";
import { v4 as uuidv4 } from "uuid";

export const PostsLayout = () => {
  const { setModalContent } = useModal();
  const location = useLocation();
  const regex = /^\/blogs\/([a-zA-Z0-9_-]+)$/;
  const match = location.pathname.match(regex);

  if (match) {
    return <Outlet />;
  }

  return (
    <div className="p-12 pt-16">
      <div className="mb-10">
        <h1 className="text-2xl mb-6 md:text-4xl 2xl:text-3xl font-semibold text-gray-800 dark:text-gray-50">
          Blogs
        </h1>

        <div className="flex justify-between items-center">
          <div className="flex gap-x-5 items-center">
            {[
              {
                title: "Posts",
                Icon: ClipboardDocumentListIcon,
                path: paths.dashboard.blogs,
              },
              {
                title: "Posts Category",
                Icon: ClipboardDocumentListIcon,
                path: paths.dashboard.blogs_category,
              },
            ].map((item, idx) => (
              <NavLink
                key={idx}
                className={({ isActive }) =>
                  clsx(
                    " flex flex-row-reverse gap-x-4 items-center rounded-full py-2 px-6 text-sm ",
                    isActive
                      ? "text-white bg-primary"
                      : "text-primary bg-primary bg-opacity-10"
                  )
                }
                to={item.path}
              >
                <span>
                  <item.Icon className="size-4" />{" "}
                </span>
                <span className="font-semibold">{item.title}</span>
              </NavLink>
            ))}
          </div>
          <div className="">
            {location.pathname === paths.dashboard.blogs_category && (
              <Button
                className="flex items-center gap-x-2 bg-primary text-white font-semibold text-sm rounded-full"
                onClick={() => setModalContent(<CreatePostCategory />)}
              >
                <span>
                  <PlusIcon className="size-5" />
                </span>
                <span>Create category</span>
              </Button>
            )}
            {location.pathname === paths.dashboard.blogs && (
              <Link
                className="flex px-6 py-3 rounded-md items-center gap-x-2 bg-primary text-white font-semibold text-sm "
                to={paths.dashboard.create_blog.replace(":id", uuidv4())}
              >
                <span>
                  <PlusIcon className="size-5" />
                </span>
                <span>Create blog</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};
