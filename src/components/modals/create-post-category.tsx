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

export const CreatePostCategory: React.FC<{
  data?: PostCategoryType;
  isEdit?: boolean;
}> = ({ data, isEdit }) => {
  const { setModalContent } = useModal();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<{ name: string }>({
    defaultValues: {
      name: data?.name,
    },
  });

  const { name } = watch();

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

  const onSubmit: SubmitHandler<{ name: string }> = async (values) => {
    if (isEdit && data) {
      const updatedData = { ...values, id: data.id };
      mutation
        .mutateAsync(updatedData)
        .then(() => {
          toast.success("post category updated.");
        })
        .catch(() => {
          toast.error("something went wrong, try again");
        })
        .finally(() => {
          reset();
          setModalContent(null);
        });

      return;
    }

    mutation
      .mutateAsync(values)
      .then(() => {
        toast.success("post category created.");
      })
      .catch(() => {
        toast.error("something went wrong, try again");
      })
      .finally(() => reset());
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
          <CustomInput
            label="Enter post category"
            {...register("name", { required: true })}
            error={errors.name}
            placeholder="Enter post category"
          />
          <div className="">
            <ModalButton
              text="Submit"
              variant="primary"
              loading={mutation.isLoading}
              disabled={data?.name === name}
            />
          </div>
        </form>
      </ModalBodyContainer>
    </div>
  );
};
