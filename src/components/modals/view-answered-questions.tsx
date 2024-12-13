import { XMarkIcon } from "@heroicons/react/24/solid";
import { QuestionResponseType } from "../../lib/types";
import { AnsweredQuestionsTable } from "../tables/answered-questions-table";

export const ViewAnsweredQuestionsModal: React.FC<{
  selectedResponse: QuestionResponseType;
  setSelectedResponse: React.Dispatch<
    React.SetStateAction<QuestionResponseType | undefined>
  >;
}> = ({ selectedResponse, setSelectedResponse }) => {
  return (
    <div
      className="h-screen left-0 fixed top-0  w-full inset-0 bg-black/50 backdrop-blur-sm z-50 text-white overflow-y-auto"
      onClick={() => setSelectedResponse(undefined)}
    >
      <div className="h-full  2xl:w-[80%] mx-auto relative ">
        <div className="absolute top-6 right-6">
          <button
            className=" text-gray-800 dark:text-white border border-gray-800 dark:border-white border-opacity-20 flex justify-center items-center h-8 w-8 rounded-full "
            onClick={() => setSelectedResponse(undefined)}
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>
        <div className="p-[6rem]" onClick={(e) => e.stopPropagation()}>
          <AnsweredQuestionsTable data={selectedResponse} />
        </div>
      </div>
    </div>
  );
};
