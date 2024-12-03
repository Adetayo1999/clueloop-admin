import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../table";
import { formatDate } from "../../lib/format-date";
import services from "../../services";
import { useQuery } from "react-query";
import { QuestionResponseType } from "../../lib/types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const QuestionnaireResponsesTable = () => {
  const navigate = useNavigate();

  const { data, isFetching, isLoading } = useQuery<QuestionResponseType[]>(
    ["submittedResponse"],
    services.getSubmittedResponses,
    {
      refetchOnWindowFocus: false,
      onError(error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else toast.error("Something went wrong, try again later");

        navigate(-1);
      },
    }
  );

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

    columnHelper.accessor("created_at", {
      header: "Date Created",
      cell: (info) => <p>{formatDate(info.getValue())}</p>,
    }),
    columnHelper.accessor("updated_at", {
      header: "Date Updated",
      cell: (info) => <p>{formatDate(info.getValue())}</p>,
    }),
  ];

  return (
    <div className="">
      <CustomTable
        data={data || []}
        columns={columns}
        loading={isFetching || isLoading}
      />
    </div>
  );
};
