import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../table";
import { formatDate } from "../../lib/format-date";
import services from "../../services";
import { useQuery } from "react-query";
import {
  AnswerType,
  QuestionResponseType,
  SubmittedResponsesType,
} from "../../lib/types";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../button";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";
import { exportToExcel } from "../../lib/excel-generator";
import { ViewAnsweredQuestionsModal } from "../modals/view-answered-questions";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export const QuestionnaireResponsesTable = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedResponse, setSelectedResponse] =
    useState<QuestionResponseType>();

  const { data, isFetching, isLoading } = useQuery<SubmittedResponsesType>(
    ["submittedResponse"],
    () => services.getSubmittedResponses(Number(id)),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(id),
      onError(error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else toast.error("Something went wrong, try again later");

        navigate(-1);
      },
    }
  );

  const handleExportData = () => {
    if (!data || data?.data?.length === 0) return;

    const questionsList = (data: AnswerType[]) => {
      const extractedAnswers: Record<string, string> = {};
      data.forEach((item, idx) => {
        extractedAnswers[`Question ${idx + 1}`] = item.question.title;
      });

      return extractedAnswers;
    };

    const dataToExport = data.data.map((item, idx) => ({
      ID: idx + 1,
      Email: item.clients.email,
      "Full Name": `${item.clients.first_name} ${item.clients.last_name}`,
      "Phone Number": item.clients.phone_number,
      Score: item.percentage.toFixed(2),
      ...questionsList(item.answers),
      "Date Submitted": formatDate(item.created_at),
    }));

    exportToExcel(dataToExport, "questionniare_response");
  };

  const columnHelper = createColumnHelper<QuestionResponseType>();

  const columns = [
    {
      header: "#", // Header for the index column
      accessorFn: (_: QuestionResponseType, rowIndex: number) => rowIndex + 1, // Incremental index
      id: "index",
    },

    columnHelper.accessor("clients.email", {
      header: "Email",
      cell: (info) => <p className="">{info.getValue()}</p>,
    }),

    columnHelper.accessor(
      (d) => `${d.clients.first_name} ${d.clients.last_name}`,
      {
        header: "Name",
        cell: (info) => <p className="">{info.getValue()}</p>,
      }
    ),

    columnHelper.accessor("clients.phone_number", {
      header: "Phone Number",
      cell: (info) => <p className="">{info.getValue()}</p>,
    }),

    columnHelper.accessor("percentage", {
      header: "Score",
      cell: (info) => (
        <p className="text-green-600">{info.getValue().toFixed(2)}%</p>
      ),
    }),

    columnHelper.accessor("created_at", {
      header: "Date Created",
      cell: (info) => <p>{formatDate(info.getValue())}</p>,
    }),
    // columnHelper.accessor(() => "action", {
    //   header: "Action",
    //   id: "action",
    //   cell: (info) => (
    //     <div className="">
    //       <button
    //         className="bg-primary h-[2.5rem]  duration-100 transition px-4 py-2 rounded-md  text-sm flex justify-center items-center text-white font-medium"
    //         onClick={() => setSelectedResponse(info.row.original)}
    //       >
    //         View Questions
    //       </button>
    //     </div>
    //   ),
    // }),
    ...Array.from({ length: data?.data[0]?.answers.length || 0 }, (_, index) =>
      columnHelper.accessor((row) => row.answers[index]?.question.title || "", {
        header: `Question ${index + 1}`,
        cell: (info) => <p>{info.getValue()}</p>,
        id: `q${index + 1}`, // Unique ID for each column
      })
    ),
  ];

  return (
    <>
      <div className="">
        <div className="mb-5 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 dark:text-gray-50 text-xl">
            {data && data.category.length ? data.category[0].name + "'s" : ""}{" "}
            Questionnaire Responses
          </h3>
          <Button
            className="flex items-center gap-x-2 bg-green-600 hover:bg-green-800 text-white font-semibold text-sm rounded-full"
            onClick={handleExportData}
          >
            <span>
              <InboxArrowDownIcon className="size-5" />
            </span>
            <span>Export Responses</span>
          </Button>
        </div>
        <div className="">
          <CustomTable
            data={data?.data || []}
            columns={columns}
            loading={isFetching || isLoading}
          />
        </div>
      </div>
      <AnimatePresence>
        {selectedResponse && (
          <ViewAnsweredQuestionsModal
            selectedResponse={selectedResponse}
            setSelectedResponse={setSelectedResponse}
          />
        )}
      </AnimatePresence>
    </>
  );
};
