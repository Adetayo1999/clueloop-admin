import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../components/button";
import { useModal } from "../../../context/modal";
import { CreateQuestion } from "../../../components/modals/create-question";
import { QuestionsTable } from "../../../components/tables/questions";
import { useParams } from "react-router-dom";

function isNumber(input: string | undefined) {
  if (input === undefined) return false;

  const num = parseFloat(input);

  // Check if conversion is valid
  if (isNaN(num)) {
    return false;
  }
  return true;
}
export default function Questions() {
  const { setModalContent } = useModal();

  const { id } = useParams();

  return (
    <div className="p-12 pt-16">
      <div className="mb-10 flex justify-between items-center">
        <h1 className="text-2xl mb-6 md:text-4xl 2xl:text-3xl font-semibold text-gray-800 dark:text-gray-50">
          Questions
        </h1>

        <Button
          className="flex items-center gap-x-2 bg-primary text-white font-semibold text-sm rounded-full"
          onClick={() =>
            setModalContent(<CreateQuestion category_id={Number(id)} />)
          }
          disabled={!isNumber(id)}
        >
          <span>
            <PlusIcon className="size-5" />
          </span>
          <span>Create Question</span>
        </Button>
      </div>

      <QuestionsTable />
    </div>
  );
}
