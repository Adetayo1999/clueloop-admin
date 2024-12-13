import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../table";
import { formatDate } from "../../lib/format-date";
import { AnswerType, QuestionResponseType } from "../../lib/types";
import { Button } from "../button";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";
import { exportQuestionnaireToExcel } from "../../lib/excel-generator";

export const AnsweredQuestionsTable: React.FC<{
  data: QuestionResponseType;
}> = ({ data }) => {
  const columnHelper = createColumnHelper<AnswerType[]>();

  const columns = [
    {
      header: "#", // Header for the index column
      accessorFn: (_: AnswerType, rowIndex: number) => rowIndex + 1, // Incremental index
      id: "index",
    },

    columnHelper.accessor("question.title", {
      header: "Question",
      cell: (info) => <p className="">{info.getValue()}</p>,
    }),

    columnHelper.accessor("option.value", {
      header: "Selected Option",
      cell: (info) => <p className="">{info.getValue()}</p>,
    }),

    columnHelper.accessor("option.score", {
      header: "Selected Option Score",
      cell: (info) => <p className="">{info.getValue()}</p>,
    }),
    columnHelper.accessor("created_at", {
      header: "Date Created",
      cell: (info) => <p>{formatDate(info.getValue() as string)}</p>,
    }),
  ];

  return (
    <>
      <div className="">
        <div className="mb-5 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 dark:text-gray-50 text-xl">
            {`${data.clients.first_name} ${data.clients.last_name}`}'s
            Questionnaire Response
          </h3>
          <Button
            className="flex items-center gap-x-2 bg-green-600 hover:bg-green-800 text-white font-semibold text-sm rounded-full"
            onClick={() =>
              exportQuestionnaireToExcel(data, `${data.clients.first_name}`)
            }
          >
            <span>
              <InboxArrowDownIcon className="size-5" />
            </span>
            <span>Export Response</span>
          </Button>
        </div>
        <div className="">
          <CustomTable data={data.answers} columns={columns} />
        </div>
      </div>
    </>
  );
};
