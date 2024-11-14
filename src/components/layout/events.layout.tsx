import {
  ClipboardDocumentListIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { paths } from "../../routes/paths";
import { Button } from "../button";
import { useModal } from "../../context/modal";
import { CreateEventCategory } from "../modals/create-event-category";
import { CreateEvent } from "../modals/create-event";

export const EventsLayout = () => {
  const location = useLocation();
  const { setModalContent } = useModal();

  return (
    <div className="p-12 pt-16">
      <div className="mb-10">
        <h1 className="text-2xl mb-6 md:text-4xl 2xl:text-3xl font-semibold text-gray-800 dark:text-gray-50">
          Events
        </h1>

        <div className="flex justify-between items-center">
          <div className="flex gap-x-5 items-center">
            {[
              {
                title: "Events",
                Icon: ClipboardDocumentListIcon,
                path: paths.dashboard.events,
              },
              {
                title: "Events Category",
                Icon: ClipboardDocumentListIcon,
                path: paths.dashboard.events_category,
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
            {location.pathname === paths.dashboard.events_category && (
              <Button
                className="flex items-center gap-x-2 bg-primary text-white font-semibold text-sm rounded-full"
                onClick={() => setModalContent(<CreateEventCategory />)}
              >
                <span>
                  <PlusIcon className="size-5" />
                </span>
                <span>Create category</span>
              </Button>
            )}
            {location.pathname === paths.dashboard.events && (
              <Button
                className="flex items-center gap-x-2 bg-primary text-white font-semibold text-sm rounded-full"
                onClick={() => setModalContent(<CreateEvent />)}
              >
                <span>
                  <PlusIcon className="size-5" />
                </span>
                <span>Create event</span>
              </Button>
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
