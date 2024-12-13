import { useMutation, useQuery, useQueryClient } from "react-query";
import { FileRejection, useDropzone } from "react-dropzone";
import CustomEditor from "../../../components/editor";
import CustomInput from "../../../components/input";
import CustomTextarea from "../../../components/textarea";
import { PostCategoryType, PostType } from "../../../lib/types";
import services from "../../../services";
import CustomSelect from "../../../components/custom-select";
import { CloudArrowDownIcon, PhotoIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchUserData } from "../../../lib/storage";
import { useNavigate, useParams } from "react-router-dom";
import { validate } from "uuid";
import { paths } from "../../../routes/paths";
import toast from "react-hot-toast";

interface CreateBlogFormType {
  title: string;
  category_id: number;
  authors: string;
  snippets: string;
}

function isNumber(str: string) {
  return !isNaN(parseFloat(str));
}

export const CreateBlog = () => {
  const [value, setValue] = useState("");
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: singlePost, isLoading: singlePostLoading } = useQuery<PostType>(
    ["singlePost"],
    () => services.getSinglePost(Number(id)),
    {
      enabled:
        validate(id) !== true && typeof id !== "undefined" && isNumber(id),
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      onError(error) {
        if (error instanceof Error) {
          toast.error(error.message);
          return;
        }
        toast.error("Something went wrong.");
        navigate(paths.dashboard.blogs);
      },
    }
  );

  const isEdit = validate(id) !== true && singlePost ? true : false;

  const {
    register,
    handleSubmit,
    setValue: setFormValue,
  } = useForm<CreateBlogFormType>();

  const { data, isLoading: postCategoryLoading } = useQuery<PostCategoryType[]>(
    ["postCategories"],
    services.getPostsCategory,
    {
      refetchOnWindowFocus: false,
    }
  );

  const mutation = useMutation({
    mutationFn: services.createPost,
    onSuccess: () => {
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("posts");
    },
  });

  const editMutation = useMutation({
    mutationFn: services.editPost,
    onSuccess: () => {
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("singlePost");
    },
  });

  const publishMutation = useMutation({
    mutationFn: services.publishPost,
    onSuccess: () => {
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("singlePost");

      toast.success("Post published");
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("Something went wrong.");
    },
  });

  useEffect(() => {
    if (isEdit && singlePost) {
      setFormValue("title", singlePost.title);
      setFormValue("category_id", singlePost.category_id);
      setFormValue("authors", singlePost.authors);
      setFormValue("snippets", singlePost.snippets);
      setValue(singlePost.content);
      setImagePreview(singlePost.banner);
    }
  }, [isEdit, singlePost, setFormValue]);

  const formattedPostCategory = data
    ? data.map((item) => ({ label: item.name, value: item.id.toString() }))
    : [];

  const onImageDrop = (files: File[], rejectedFiles: FileRejection[]) => {
    rejectedFiles.forEach((rejectedFile) => {
      const { file, errors } = rejectedFile;
      errors.forEach((error) => {
        if (error.code === "file-invalid-type") {
          console.log(`File format not accepted: ${file.type}`, true);
        } else if (error.code === "file-too-large") {
          console.log(
            `File is too large: ${(file.size / 1024).toFixed(2)} KB`,
            true
          );
        }
      });
    });

    if (files.length > 0) {
      setImage(files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
    onDrop: onImageDrop,
    maxSize: 5120000,
  });

  const onSubmit: SubmitHandler<CreateBlogFormType> = async (data) => {
    try {
      if (isEdit && singlePost) {
        await editMutation.mutateAsync({
          id: singlePost.id,
          user_id: singlePost.user_id,
          ...data,
          content: value,
          banner: image,
          _method: "put",
        });

        toast.success("Post edited successfully");

        return;
      }

      if (!image) {
        toast.error("Banner image required");
        return;
      }

      const response = await mutation.mutateAsync({
        ...data,
        user_id: fetchUserData()!.id,
        content: value,
        banner: image,
      });

      toast.success("Post created successfully");

      navigate(paths.dashboard.create_blog.replace(":id", response.id));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("Something went wrong.");
    }
  };

  const handlePublish = () => {
    if (!isEdit || !singlePost) return;

    publishMutation.mutate(singlePost);
  };

  return (
    <div className="flex justify-between h-screen overflow-hidden">
      <div className="flex-[0.7] h-full overflow-y-auto">
        <div className="h-[25rem] flex justify-center items-center overflow-hidden  bg-slate-50 dark:bg-gray-800">
          {imagePreview ? (
            <img src={imagePreview} className="w-full h-full object-cover" />
          ) : null}
          {!imagePreview ? (
            <span>
              <PhotoIcon className="size-40 text-gray-500" />
            </span>
          ) : null}
        </div>
        <CustomEditor value={value} setValue={setValue} />
      </div>
      <div className="flex-[0.3] relative py-10 px-5 border-l dark:border-gray-500 dark:border-opacity-40">
        <form
          className="flex flex-col gap-y-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            label="Title"
            placeholder="Enter title"
            {...register("title", { required: true })}
          />
          <CustomInput
            label="Post Author"
            placeholder="Enter post author"
            {...register("authors", { required: true })}
          />
          <CustomTextarea
            label="Post Description"
            placeholder="Enter post description"
            rows={5}
            {...register("snippets", { required: true })}
          />
          <CustomSelect
            label="Post Category"
            options={[
              { label: "Select a category", value: "" },
              ...formattedPostCategory,
            ]}
            {...register("category_id", { required: true })}
          />

          <div className="flex flex-col gap-y-2 mb-1">
            <div className="">
              <label
                className={clsx(
                  `text-sm font-semibold dark:text-gray-100 text-[#344054] `
                )}
              >
                Post Banner
              </label>
            </div>
            <div
              {...getRootProps({
                className: clsx(
                  `h-[10rem] relative flex justify-center items-center p-6  cursor-pointer  dark:border-gray-500 dark:border-opacity-40 border border-dashed dark:bg-gray-800 bg-[#F6F6F6]  rounded overflow-hidden`,
                  imagePreview && image ? "" : ""
                ),
              })}
            >
              {imagePreview && (
                <div className="w-full h-full absolute z-10">
                  <img
                    src={imagePreview}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {image && imagePreview && (
                <div className="w-full h-full absolute z-20 bg-black bg-opacity-40"></div>
              )}
              <input
                className="input-zone  "
                {...getInputProps({
                  name: "post-logo",
                  required: isEdit ? false : true,
                })}
              />
              <div className="text-center">
                {isDragActive ? (
                  <p className="dropzone-content">
                    Release to drop the files here
                  </p>
                ) : (
                  <div>
                    <span className="flex items-center justify-center z-50 relative">
                      <CloudArrowDownIcon
                        className={clsx(
                          "size-12 text-gray-500",
                          image && imagePreview
                            ? "text-gray-50"
                            : "text-gray-500"
                        )}
                      />
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex ">
            <button
              className="bg-primary text-white transition duration-300 min-w-[10rem]  rounded-md px-8 py-2 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={
                !value ||
                mutation.isLoading ||
                postCategoryLoading ||
                !data ||
                singlePostLoading
              }
            >
              {mutation.isLoading || editMutation.isLoading
                ? "Loading..."
                : isEdit
                ? "Edit"
                : "Submit"}
            </button>
          </div>
        </form>

        {isEdit && singlePost && !singlePost?.is_published ? (
          <button
            className="bg-green-500 right-5 absolute bottom-8 w-fit text-white transition duration-300 min-w-[10rem]  rounded-md px-8 py-2 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={handlePublish}
            disabled={!isEdit || !singlePost || publishMutation.isLoading}
          >
            Publish
          </button>
        ) : null}
      </div>
    </div>
  );
};
