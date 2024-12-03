import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../table";
import { formatDate } from "../../lib/format-date";
import services from "../../services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useModal } from "../../context/modal";
import { QuestionType } from "../../lib/types";
import { DeleteDialogModal } from "../modals/delete-dialog";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { CreateQuestion } from "../modals/create-question";

export const QuestionsTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setModalContent } = useModal();

  const { data, isFetching, isLoading } = useQuery<QuestionType[]>(
    ["questions"],
    () => services.getAllQuestionnaireQuestions(Number(id)),
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

  const mutation = useMutation({
    mutationFn: services.deleteQuestion,
    onSuccess: () => {
      toast.success("questions deleted successfully");
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("questions");
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("something went wrong, try again later");
    },
  });

  const handleDeleteQuestion = (id: number) => {
    return mutation.mutateAsync(id);
  };

  const columnHelper = createColumnHelper<QuestionType>();

  const columns = [
    {
      header: "#", // Header for the index column
      accessorFn: (_: QuestionType, rowIndex: number) => rowIndex + 1, // Incremental index
      id: "index",
    },

    columnHelper.accessor("title", {
      header: "Question",
      cell: (info) => (
        <p className="w-[18rem]  whitespace-normal">{info.getValue()}</p>
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
    columnHelper.accessor(() => "action", {
      id: "action",
      header: "",
      cell: (info) => (
        <div className="flex items-center gap-x-5">
          <button
            className="bg-red-600 h-[2.5rem] flex justify-center items-center hover:bg-red-800 duration-100 transition px-4 py-2 rounded-md"
            onClick={() =>
              setModalContent(
                <DeleteDialogModal
                  title="Delete Question"
                  actionHandler={() =>
                    handleDeleteQuestion(info.row.original.id)
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
                <CreateQuestion
                  category_id={info.row.original.category_id}
                  isEdit
                  data={info.row.original}
                />
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
