import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../table";
import { formatDate } from "../../lib/format-date";
import services from "../../services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useModal } from "../../context/modal";
import { CreatePostCategory } from "../modals/create-post-category";
import { PostCategoryType } from "../../lib/types";
import { DeleteDialogModal } from "../modals/delete-dialog";
import toast from "react-hot-toast";

export const PostCategoriesTable = () => {
  const queryClient = useQueryClient();
  const { setModalContent } = useModal();
  const { data, isFetching, isLoading } = useQuery<PostCategoryType[]>(
    ["postCategories"],
    services.getPostsCategory,
    {
      refetchOnWindowFocus: false,
    }
  );

  const mutation = useMutation({
    mutationFn: services.deletePostsCategory,
    onSuccess: () => {
      toast.success("Post category created successfullly");
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("postCategories");
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("something went wrong, try again later");
    },
  });

  const handleDeletePostCategory = (id: number) => {
    return mutation.mutateAsync(id);
  };

  const columnHelper = createColumnHelper<PostCategoryType>();

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => <p>{info.getValue()}</p>,
    }),
    columnHelper.accessor("banner", {
      header: "Banner Image",
      cell: (info) => (
        <div className="h-[4rem] w-[4rem] bg-gray-100 dark:bg-black rounded-md overflow-hidden dark:border-gray-500 dark:border-opacity-40 border">
          <img
            src={info.getValue()}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ),
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
                  title="Delete Post Category"
                  actionHandler={() =>
                    handleDeletePostCategory(info.row.original.id)
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
                <CreatePostCategory isEdit data={info.row.original} />
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
