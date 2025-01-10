import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../table";
import { formatDate } from "../../lib/format-date";
import services from "../../services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useModal } from "../../context/modal";
import { QuestionnaireQualifierType } from "../../lib/types";
import { DeleteDialogModal } from "../modals/delete-dialog";
import toast from "react-hot-toast";
import { CreateQuestionnaireQualifier } from "../modals/create-questionnaire-qualifier";

export const QuestionnaireQualifierTable = () => {
  const queryClient = useQueryClient();
  const { setModalContent } = useModal();
  const { data, isFetching, isLoading } = useQuery<
    QuestionnaireQualifierType[]
  >(["qualify"], services.getQuestionnaireQualifier, {
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: services.deleteQuestionnaireQualifer,
    onSuccess: () => {
      toast.success("qualifier deleted successfullly");
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("qualify");
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("something went wrong, try again later");
    },
  });

  const handleDeleteQualifier = (id: number) => {
    return mutation.mutateAsync(id);
  };

  const columnHelper = createColumnHelper<QuestionnaireQualifierType>();

  const columns = [
    {
      header: "#", // Header for the index column
      accessorFn: (_: QuestionnaireQualifierType, rowIndex: number) =>
        rowIndex + 1, // Incremental index
      id: "index",
    },

    columnHelper.accessor(
      (data) => `${data.minimum_percentage}% - ${data.maximum_percentage}%`,
      {
        header: "Qualifying Percentage Range",
        cell: (info) => <p>{info.getValue()}</p>,
      }
    ),
    columnHelper.accessor("category", {
      header: "Questionnaire Title",
      cell: (info) => <p>{info.getValue()?.name || "NIL"}</p>,
    }),
    columnHelper.accessor("action", {
      header: "Qualifier Action",
      cell: (info) => (
        <p>
          {info.row.original.oppurtunity
            ? `${info.row.original.oppurtunity.title} (Opportunity)`
            : info.getValue() ?? "NIL"}
        </p>
      ),
    }),
    columnHelper.accessor("created_at", {
      header: "Date Created",
      cell: (info) => <p>{formatDate(info.getValue())}</p>,
    }),
    columnHelper.accessor("updated_at", {
      header: "Date Updated",
      cell: (info) => <p>{formatDate(info.getValue())}</p>,
    }),
    columnHelper.accessor(() => "fn", {
      id: "fn",
      header: "",
      cell: (info) => (
        <div className="flex items-center gap-x-8">
          <button
            className="bg-red-600 h-[2.5rem] flex justify-center items-center hover:bg-red-800 duration-100 transition px-4 py-2 rounded-md"
            onClick={() =>
              setModalContent(
                <DeleteDialogModal
                  title="Delete Questionnaire Qualifier"
                  actionHandler={() =>
                    handleDeleteQualifier(info.row.original.id)
                  }
                />
              )
            }
          >
            <TrashIcon className="size-5 text-white" />
          </button>
          <button
            className="bg-primary h-[2.5rem]  duration-100 transition px-4 py-2 rounded-md flex justify-center items-center"
            onClick={() =>
              setModalContent(
                <CreateQuestionnaireQualifier isEdit data={info.row.original} />
              )
            }
          >
            <PencilSquareIcon className="size-5 text-white" />
          </button>
        </div>
      ),
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
