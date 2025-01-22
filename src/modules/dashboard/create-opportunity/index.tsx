import { useMutation, useQuery, useQueryClient } from "react-query";
import { FileRejection, useDropzone } from "react-dropzone";
import CustomEditor from "../../../components/editor";
import CustomInput from "../../../components/input";
import { OpportunityType } from "../../../lib/types";
import services from "../../../services";
import { CloudArrowDownIcon, PhotoIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { validate } from "uuid";
import { paths } from "../../../routes/paths";
import toast from "react-hot-toast";
import CustomTextarea from "../../../components/textarea";
import { URL_VALIDATION } from "../../../lib/validation";
import { CustomToggle } from "../../../components/custom-toggle";
import { errorFormatter } from "../../../lib/format-error";

interface CreateOpportunityFormType {
  title: string;
  action_link: string;
  document_link: string;
  snippets: string;
  document_text: string;
  action_text: string;
}

function isNumber(str: string) {
  return !isNaN(parseFloat(str));
}

export default function CreateOpportunity() {
  const [value, setValue] = useState("");
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);

  const { data: singleOpportunity, isLoading: singleOpportunityLoading } =
    useQuery<OpportunityType>(
      ["singleOpportunity"],
      () => services.getSingleOpportunity(Number(id)),
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
          navigate(paths.dashboard.opportunities);
        },
      }
    );

  const isEdit = validate(id) !== true && singleOpportunity ? true : false;

  const {
    register,
    handleSubmit,
    setValue: setFormValue,
  } = useForm<CreateOpportunityFormType>();

  const mutation = useMutation({
    mutationFn: services.createOpportunity,
    onSuccess: () => {
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("opportunities");
    },
  });

  const editMutation = useMutation({
    mutationFn: services.updateOpportunity,
    onSuccess: () => {
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("opportunities");
      queryClient.invalidateQueries("singleOpportunity");
    },
  });

  useEffect(() => {
    if (isEdit && singleOpportunity) {
      setFormValue("title", singleOpportunity.title);
      setFormValue("action_link", singleOpportunity.action_link);
      setFormValue("document_link", singleOpportunity.document_link);
      setFormValue("snippets", singleOpportunity.snippets);
      setFormValue("action_text", singleOpportunity.action_text);
      setFormValue("document_text", singleOpportunity.document_text);
      setIsTransitionEnabled(Boolean(singleOpportunity.is_transition));
      setValue(singleOpportunity.content);
      setImagePreview(singleOpportunity.banner);
    }
  }, [isEdit, singleOpportunity, setFormValue]);

  const onImageDrop = (files: File[], rejectedFiles: FileRejection[]) => {
    rejectedFiles.forEach((rejectedFile) => {
      const { file, errors } = rejectedFile;
      errors.forEach((error) => {
        if (error.code === "file-invalid-type") {
          toast.error(`File format not accepted: ${file.type}`);
        } else if (error.code === "file-too-large") {
          toast.error(`File is too large: ${(file.size / 1024).toFixed(2)} KB`);
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
    maxSize: 1500000,
  });

  const onSubmit: SubmitHandler<CreateOpportunityFormType> = async (data) => {
    try {
      if (isEdit && singleOpportunity) {
        await editMutation.mutateAsync({
          id: singleOpportunity.id,
          ...data,
          content: value,
          _method: "put",
          banner: image,
          is_transition: isTransitionEnabled ? "1" : "0",
        });

        toast.success("Opportunity edited successfully");

        return;
      }

      if (!image) {
        toast.error("Banner image required");
        return;
      }

      const response = await mutation.mutateAsync({
        ...data,
        content: value,
        banner: image,
        is_transition: isTransitionEnabled ? "1" : "0",
      });

      toast.success("Opportunnity created successfully");

      navigate(paths.dashboard.create_opportunity.replace(":id", response.id));
    } catch (error) {
      toast.error(errorFormatter(error));
    }
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
      <div className="flex-[0.3] relative py-10 px-5 border-l dark:border-gray-500 dark:border-opacity-40 overflow-y-auto">
        <form
          className="flex flex-col gap-y-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            label="Title"
            placeholder="Enter title"
            {...register("title", { required: true })}
          />

          <CustomTextarea
            label="Description"
            placeholder="Enter a descroption for the opportunity"
            rows={5}
            {...register("snippets", { required: true })}
          />
          <CustomInput
            label="First State "
            placeholder="Enter First State Text"
            {...register("action_text", { required: true })}
          />
          <CustomInput
            label="Label 1 (Link)"
            placeholder="Enter Label 1 Link"
            {...register("action_link", {
              required: true,
              pattern: URL_VALIDATION,
            })}
          />
          <CustomInput
            label="Second State"
            placeholder="Enter Second State Text"
            {...register("document_text", { required: true })}
          />
          <CustomInput
            label="Label 2 (Link)"
            placeholder="Enter Label 2 Link"
            {...register("document_link", {
              required: true,
              pattern: URL_VALIDATION,
            })}
          />
          <div className="flex flex-col gap-y-2">
            <label
              className={clsx(
                `text-sm font-semibold dark:text-gray-100 text-[#344054]`
              )}
            >
              Enable Transition
            </label>
            <CustomToggle
              defaultValue={
                singleOpportunity
                  ? Boolean(singleOpportunity.is_transition)
                  : false
              }
              onChange={(state) => setIsTransitionEnabled(state)}
            />
          </div>

          <div className="flex flex-col gap-y-2 mb-1">
            <div className="">
              <label
                className={clsx(
                  `text-sm font-semibold dark:text-gray-100 text-[#344054] `
                )}
              >
                Opportunity Banner
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
                !value || mutation.isLoading || singleOpportunityLoading
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
      </div>
    </div>
  );
}
