import { DashboardCard } from "../../../components/card";
import {
  SwatchIcon,
  DocumentIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="p-12 pt-16">
      <div className="mb-10">
        <h1 className="text-2xl md:text-4xl 2xl:text-3xl font-semibold text-gray-800 dark:text-gray-50">
          Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-5 gap-x-14">
        <DashboardCard metric={400} title="Total Blogs" Icon={SwatchIcon} />
        <DashboardCard metric={10} title="Total Events" Icon={DocumentIcon} />
        <DashboardCard
          metric={2}
          title="Total Blog Categories"
          Icon={UserGroupIcon}
        />
      </div>
    </div>
  );
}
