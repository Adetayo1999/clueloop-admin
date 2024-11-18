import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../input";
import {
  ModalBodyContainer,
  ModalButton,
  ModalCloseButton,
  ModalHeaderContainer,
  ModalTitle,
} from "../modal";
import services from "../../services";
import { useMutation, useQueryClient } from "react-query";
import { PostCategoryType } from "../../lib/types";
import { useModal } from "../../context/modal";
import toast from "react-hot-toast";
import { CreatePostCategoryRequestBodyType } from "../../services/types";
import CustomTextarea from "../textarea";
import CustomDropzone from "../custom-dropdown";
import { useState } from "react";
import { FileRejection } from "react-dropzone";

const DEFAULT_IMAGE_URL =
  "https://clueloop.quickgeosearch.com.ng/images/default-banner.jpg";

type CreatePostCategoryFormType = Omit<
  CreatePostCategoryRequestBodyType,
  "banner"
>;

export const CreatePostCategory: React.FC<{
  data?: PostCategoryType;
  isEdit?: boolean;
}> = ({ data, isEdit }) => {
  const [image, setImage] = useState<File | string | undefined>();
  const [imagePreview, setImagePreview] = useState<string>();
  const { setModalContent } = useModal();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatePostCategoryFormType>({
    defaultValues: {
      name: data?.name,
      description: data?.description,
    },
  });

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

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:
      isEdit && data
        ? services.updatePostsCategory
        : services.createPostsCategory,
    onSuccess: () => {
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("postCategories");
    },
  });

  const onSubmit: SubmitHandler<CreatePostCategoryFormType> = async (
    values
  ) => {
    if (isEdit && data) {
      const updatedData = {
        ...values,
        id: data.id,
        banner: image || data.banner,
      };
      mutation
        .mutateAsync(updatedData)
        .then(() => {
          toast.success("post category updated.");
          reset();
          setModalContent(null);
        })
        .catch(() => {
          toast.error("something went wrong, try again");
        });
      return;
    }

    if (!image) return;

    mutation
      .mutateAsync({ ...values, banner: image })
      .then(() => {
        toast.success("post category created.");
        reset();
        setModalContent(null);
      })
      .catch(() => {
        toast.error("something went wrong, try again");
      });
  };

  return (
    <div className="">
      <ModalHeaderContainer>
        <ModalTitle title="Create Post Category" />
        <ModalCloseButton />
      </ModalHeaderContainer>
      <ModalBodyContainer>
        <form
          className="flex flex-col gap-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row  gap-x-5">
            <div className="flex-[0.4] flex-shrink-0">
              <CustomDropzone
                accept={{
                  "image/png": [".png"],
                  "image/jpeg": [".jpeg"],
                  "image/jpg": [".jpg"],
                }}
                name="banner"
                className="border border-[#0052FF1A] h-full"
                maxSize={512000}
                onDrop={onImageDrop}
                maxFiles={1}
                required={
                  isEdit &&
                  Boolean(data?.banner) &&
                  data?.banner !== DEFAULT_IMAGE_URL
                    ? false
                    : true
                }
              />
            </div>
            <div className="rounded overflow-hidden dark:border-gray-500 dark:border-opacity-40   h-[10rem] border flex-[0.6]">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Staff"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
          <CustomInput
            label="Enter post category"
            {...register("name", { required: true })}
            error={errors.name}
            placeholder="Enter post category"
          />
          <CustomTextarea
            label="Enter description"
            {...register("description", { required: true })}
            error={errors.description}
            placeholder="Enter description"
            rows={5}
          />
          <div className="">
            <ModalButton
              text="Submit"
              variant="primary"
              loading={mutation.isLoading}
            />
          </div>
        </form>
      </ModalBodyContainer>
    </div>
  );
};
