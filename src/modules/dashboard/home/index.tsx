import { useQuery } from "react-query";
import { DashboardCard } from "../../../components/card";
import {
  SwatchIcon,
  DocumentIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { EventType } from "react-hook-form";
import services from "../../../services";
import { PostType, QuestionnaireType } from "../../../lib/types";

export default function Home() {
  const { data } = useQuery<EventType[]>(["events"], services.getEvents, {
    refetchOnWindowFocus: false,
  });

  const { data: postData } = useQuery<PostType[]>(
    ["posts"],
    services.getPosts,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: questionnaireData } = useQuery<QuestionnaireType[]>(
    ["questionnaire"],
    services.getQuestionnaires,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="p-12 pt-16">
      <div className="mb-10">
        <h1 className="text-2xl md:text-4xl 2xl:text-3xl font-semibold text-gray-800 dark:text-gray-50">
          Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-5 gap-x-14">
        <DashboardCard
          metric={postData?.length || 0}
          title="Total Blogs"
          Icon={SwatchIcon}
        />
        <DashboardCard
          metric={data?.length || 0}
          title="Total Events"
          Icon={DocumentIcon}
        />
        <DashboardCard
          metric={questionnaireData?.length || 0}
          title="Total Questionnaires"
          Icon={UserGroupIcon}
        />
      </div>
    </div>
  );
}
