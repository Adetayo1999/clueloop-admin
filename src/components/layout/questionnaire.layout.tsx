import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { paths } from "../../routes/paths";
import clsx from "clsx";
import { Button } from "../button";
import { useModal } from "../../context/modal";
import { CreateQuestionnaire } from "../modals/create-questionnaire";
import { CreateQuestion } from "../modals/create-question";
import { CreateQuestionnaireQualifier } from "../modals/create-questionnaire-qualifier";

export const QuestionnaireLayout = () => {
  const { setModalContent } = useModal();
  const location = useLocation();
  const { id } = useParams();

  return (
    <div className="p-12 pt-16">
      <div className="mb-10">
        <h1 className="text-2xl mb-6 md:text-4xl 2xl:text-3xl font-semibold text-gray-800 dark:text-gray-50">
          Assessments
        </h1>

        <div className="flex justify-between items-center">
          <div className="flex gap-x-5 items-center">
            {[
              {
                title: "Assessment Category",
                Icon: ClipboardDocumentListIcon,
                path: paths.dashboard.questionnaires,
              },
              {
                title: "Assessment Qualifiers",
                Icon: ClipboardDocumentListIcon,
                path: paths.dashboard.qualifiers,
              },
            ].map((item, idx) => (
              <NavLink
                key={idx}
                className={() =>
                  clsx(
                    " flex flex-row-reverse gap-x-4 items-center rounded-full py-2 px-6 text-sm ",
                    location.pathname === item.path
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
            {location.pathname === paths.dashboard.questionnaires && (
              <Button
                className="flex items-center gap-x-2 bg-primary text-white font-semibold text-sm rounded-full"
                onClick={() => setModalContent(<CreateQuestionnaire />)}
              >
                <span>
                  <PlusIcon className="size-5" />
                </span>
                <span>Create Assessment</span>
              </Button>
            )}
            {location.pathname === paths.dashboard.qualifiers && (
              <Button
                className="flex items-center gap-x-2 bg-primary text-white font-semibold text-sm rounded-full"
                onClick={() =>
                  setModalContent(<CreateQuestionnaireQualifier />)
                }
              >
                <span>
                  <PlusIcon className="size-5" />
                </span>
                <span>Create Qualifier</span>
              </Button>
            )}
            {id &&
              location.pathname ===
                paths.dashboard.quesitons.replace(":id", id) && (
                <Button
                  className="flex items-center gap-x-2 bg-primary text-white font-semibold text-sm rounded-full"
                  onClick={() =>
                    setModalContent(<CreateQuestion category_id={Number(id)} />)
                  }
                >
                  <span>
                    <PlusIcon className="size-5" />
                  </span>
                  <span>Create Question</span>
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
