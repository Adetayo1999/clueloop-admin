import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../table";
import { formatDate } from "../../lib/format-date";
import services from "../../services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useModal } from "../../context/modal";
import { PostType } from "../../lib/types";
import { DeleteDialogModal } from "../modals/delete-dialog";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import toast from "react-hot-toast";

export const PostsTable = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setModalContent } = useModal();
  const { data, isFetching, isLoading } = useQuery<PostType[]>(
    ["posts"],
    services.getPosts,
    {
      refetchOnWindowFocus: false,
    }
  );

  const mutation = useMutation({
    mutationFn: services.deletePost,
    onSuccess: () => {
      toast.success("post deleted successfully");
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("posts");
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("something went wrong, try again later");
    },
  });

  const handleDeletePost = (id: number) => {
    return mutation.mutateAsync(id);
  };

  const columnHelper = createColumnHelper<PostType>();

  const columns = [
    {
      header: "#", // Header for the index column
      accessorFn: (_: PostType, rowIndex: number) => rowIndex + 1, // Incremental index
      id: "index",
    },
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
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => (
        <p className="w-[14rem] line-clamp-3  whitespace-normal">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("authors", {
      header: "Author",
      cell: (info) => <p className="">{info.getValue()}</p>,
    }),
    columnHelper.accessor("is_published", {
      header: "Status",
      cell: (info) => (
        <button
          className={clsx(
            "px-5 text-xs flex justify-center min-w-[7rem] items-center font-semibold py-2 text-white rounded",
            info.getValue() ? "bg-green-600" : "bg-yellow-600"
          )}
        >
          {info.getValue() ? "Published" : "Draft"}
        </button>
      ),
    }),
    columnHelper.accessor("created_at", {
      header: "Date Created",
      cell: (info) => <p>{formatDate(info.getValue())}</p>,
    }),
    // columnHelper.accessor("updated_at", {
    //   header: "Date Updated",
    //   cell: (info) => <p>{formatDate(info.getValue())}</p>,
    // }),
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
                  title="Delete Post"
                  actionHandler={() => handleDeletePost(info.row.original.id)}
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
                paths.dashboard.create_blog.replace(
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
        columns={columns}
        loading={isFetching || isLoading}
      />
    </div>
  );
};
