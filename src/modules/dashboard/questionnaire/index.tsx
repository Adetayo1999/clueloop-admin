import { Button } from "../../../components/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { QuestionnairesTable } from "../../../components/tables/questionnaires";
import { useModal } from "../../../context/modal";
import { CreateQuestionnaire } from "../../../components/modals/create-questionnaire";

export default function Questionnaire() {
  const { setModalContent } = useModal();
  return (
    <div className="p-12 pt-16">
      <div className="mb-10 flex justify-between items-center">
        <h1 className="text-2xl mb-6 md:text-4xl 2xl:text-3xl font-semibold text-gray-800 dark:text-gray-50">
          Questionnaires
        </h1>

        <Button
          className="flex items-center gap-x-2 bg-primary text-white font-semibold text-sm rounded-full"
          onClick={() => setModalContent(<CreateQuestionnaire />)}
        >
          <span>
            <PlusIcon className="size-5" />
          </span>
          <span>Create Questionnaire</span>
        </Button>
      </div>
      <QuestionnairesTable />
    </div>
  );
}
