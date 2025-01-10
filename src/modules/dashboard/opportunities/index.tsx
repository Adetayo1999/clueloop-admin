import { Link } from "react-router-dom";
import { OpportunityTable } from "../../../components/tables/opportunities-table";
import { PlusIcon } from "@heroicons/react/24/solid";
import { paths } from "../../../routes/paths";
import { v4 as uuidv4 } from "uuid";

export default function Opportunities() {
  return (
    <div className="p-12 pt-16">
      <div className="mb-10 flex justify-between items-center">
        <h1 className="text-2xl mb-6 md:text-4xl 2xl:text-3xl font-semibold text-gray-800 dark:text-gray-50">
          Opportunity List
        </h1>

        <Link
          className="flex px-6 py-3 rounded-md items-center gap-x-2 bg-primary text-white font-semibold text-sm "
          to={paths.dashboard.create_opportunity.replace(":id", uuidv4())}
        >
          <span>
            <PlusIcon className="size-5" />
          </span>
          <span>Create Opportunity</span>
        </Link>
      </div>

      <OpportunityTable />
    </div>
  );
}
