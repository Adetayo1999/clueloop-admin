import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../table";
import { formatDate } from "../../lib/format-date";
import services from "../../services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { useModal } from "../../context/modal";
import { QuestionnaireType } from "../../lib/types";
import { DeleteDialogModal } from "../modals/delete-dialog";
import toast from "react-hot-toast";
import { CreateQuestionnaire } from "../modals/create-questionnaire";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";

export const QuestionnairesTable = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setModalContent } = useModal();
  const { data, isFetching, isLoading } = useQuery<QuestionnaireType[]>(
    ["questionnaire"],
    services.getQuestionnaires,
    {
      refetchOnWindowFocus: false,
    }
  );

  const mutation = useMutation({
    mutationFn: services.deleteQuestionnaire,
    onSuccess: () => {
      toast.success("questionnaire deleted successfully");
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("questionnaire");
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("something went wrong, try again later");
    },
  });

  const handleDeleteQuestionnaire = (id: number) => {
    return mutation.mutateAsync(id);
  };

  const columnHelper = createColumnHelper<QuestionnaireType>();

  const columns = [
    {
      header: "#", // Header for the index column
      accessorFn: (_: QuestionnaireType, rowIndex: number) => rowIndex + 1, // Incremental index
      id: "index",
    },

    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <p className="w-[10rem]  whitespace-normal">{info.getValue()}</p>
      ),
    }),

    columnHelper.accessor("type", {
      header: "Type",
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
                  title="Delete Questionnaire"
                  description="This questionnaire and all questions under it will be deleted. Are you sure you want to continue ?"
                  actionHandler={() =>
                    handleDeleteQuestionnaire(info.row.original.id)
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
                <CreateQuestionnaire isEdit data={info.row.original} />
              )
            }
          >
            <PencilSquareIcon className="size-5 text-white" />
          </button>
          <button
            className="bg-yellow-600 h-[2.5rem]  duration-100 transition px-4 py-2 rounded-md flex justify-center items-center"
            title="View Questionnaire"
            onClick={() =>
              navigate(
                paths.dashboard.quesitons.replace(
                  ":id",
                  info.row.original.id.toString()
                )
              )
            }
          >
            <EyeIcon className="size-5 text-white" />
          </button>
          <button
            className="bg-primary h-[2.5rem]  duration-100 transition px-4 py-2 rounded-md flex justify-center items-center text-white font-semibold"
            onClick={() =>
              navigate(
                paths.dashboard.responses.replace(
                  ":id",
                  info.row.original.id.toString()
                )
              )
            }
          >
            View Responses
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
