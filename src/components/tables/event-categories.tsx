import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../table";
import { formatDate } from "../../lib/format-date";
import services from "../../services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useModal } from "../../context/modal";
import { EventCategoryType } from "../../lib/types";
import { DeleteDialogModal } from "../modals/delete-dialog";
import { CreateEventCategory } from "../modals/create-event-category";
import toast from "react-hot-toast";

export const EventsCategoriesTable = () => {
  const queryClient = useQueryClient();
  const { setModalContent } = useModal();
  const { data, isFetching, isLoading } = useQuery<EventCategoryType[]>(
    ["eventCategories"],
    services.getEventsCategory,
    {
      refetchOnWindowFocus: false,
    }
  );

  const mutation = useMutation({
    mutationFn: services.deleteEventsCategory,
    onSuccess: () => {
      toast.success("event category created successfully");
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("eventCategories");
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("something went wrong, try again later");
    },
  });

  const handleDeleteEventCategory = (id: number) => {
    return mutation.mutateAsync(id);
  };

  const columnHelper = createColumnHelper<EventCategoryType>();

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => <p>{info.getValue()}</p>,
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
        <div className="flex items-center gap-x-8">
          <button
            className="bg-red-600 h-[2.5rem] flex justify-center items-center hover:bg-red-800 duration-100 transition px-4 py-2 rounded-md"
            onClick={() =>
              setModalContent(
                <DeleteDialogModal
                  title="Delete Event Category"
                  actionHandler={() =>
                    handleDeleteEventCategory(info.row.original.id)
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
                <CreateEventCategory isEdit data={info.row.original} />
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
