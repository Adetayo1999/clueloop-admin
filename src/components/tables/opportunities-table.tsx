import { useMutation, useQuery, useQueryClient } from "react-query";
import { OpportunityType } from "../../lib/types";
import services from "../../services";
import toast from "react-hot-toast";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../table";
import { formatDate } from "../../lib/format-date";
import { useModal } from "../../context/modal";
import { DeleteDialogModal } from "../modals/delete-dialog";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";

export const OpportunityTable = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setModalContent } = useModal();
  const { data, isFetching, isLoading } = useQuery<OpportunityType[]>(
    ["opportunities"],
    services.getOpportunities,
    {
      refetchOnWindowFocus: false,
      onError(error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else toast.error("Something went wrong, try again later");
      },
    }
  );

  const mutation = useMutation({
    mutationFn: services.deleteOpportunities,
    onSuccess: () => {
      toast.success("opportunity deleted successfully");
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("opportunities");
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("something went wrong, try again later");
    },
  });

  const handleDeleteOpportunity = (id: number) => {
    return mutation.mutateAsync(id);
  };

  const columnHelper = createColumnHelper<OpportunityType>();

  const columns = [
    {
      header: "#", // Header for the index column
      accessorFn: (_: OpportunityType, rowIndex: number) => rowIndex + 1, // Incremental index
      id: "index",
    },
    columnHelper.accessor("banner", {
      header: "Banner Image",
      cell: (info) => (
        <div className="h-[4rem] w-[4rem] bg-gray-100 dark:bg-black rounded-md overflow-hidden dark:border-gray-500 dark:border-opacity-40 border">
          <img
            src={info.getValue()}
            alt={info.row.original.title}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    }),
    columnHelper.accessor("title", {
      header: "Opportunity Title",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("document_link", {
      header: "Document Link",
      cell: (props) => <p>{props.getValue()}</p>,
    }),
    columnHelper.accessor("action_link", {
      header: "Action Link",
      cell: (props) => <p>{props.getValue() || "NIL"}</p>,
    }),
    columnHelper.accessor("created_at", {
      header: "Date Created",
      cell: (info) => <p>{formatDate(info.getValue())}</p>,
    }),

    columnHelper.accessor(() => "action", {
      id: "action",
      header: "",
      cell: (info) => (
        <div className="flex items-center gap-x-8">
          <button
            className="bg-red-600 h-[2.5rem] flex justify-center items-center hover:bg-red-800 duration-100 transition px-4 py-2 rounded-md"
            onClick={() =>
              setModalContent(
                <DeleteDialogModal
                  title="Delete Opportunity"
                  actionHandler={() =>
                    handleDeleteOpportunity(info.row.original.id)
                  }
                />
              )
            }
          >
            <TrashIcon className="size-5 text-white" />
          </button>
          <button
            className="bg-primary h-[2.5rem]  duration-100 transition px-4 py-2 rounded-md flex justify-center items-center"
            onClick={() => {
              navigate(
                paths.dashboard.create_opportunity.replace(
                  ":id",
                  info.row.original.id.toString()
                )
              );
            }}
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
        loading={isFetching || isLoading}
        columns={columns}
      />
    </div>
  );
};
