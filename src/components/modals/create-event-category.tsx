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
import { EventCategoryType } from "../../lib/types";
import { useModal } from "../../context/modal";
import toast from "react-hot-toast";

export const CreateEventCategory: React.FC<{
  data?: EventCategoryType;
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
    mutationFn: services.createEventsCategory,
    onSuccess: () => {
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("eventCategories");
    },
  });

  const editmutation = useMutation({
    mutationFn: services.updateEventsCategory,
    onSuccess: () => {
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("eventCategories");
    },
  });

  const onSubmit: SubmitHandler<{ name: string }> = async (values) => {
    if (isEdit && data) {
      editmutation
        .mutateAsync({ ...values, id: data.id, _method: "put" })
        .then(() => {
          toast.success("event category updated successfully");
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
        toast.success("event category created successfully");
      })
      .catch(() => {
        toast.error("something went wrong, try again");
      })
      .finally(() => {
        reset();
        setModalContent(null);
      });
  };

  return (
    <div className="">
      <ModalHeaderContainer>
        <ModalTitle title="Create Event Category" />
        <ModalCloseButton />
      </ModalHeaderContainer>
      <ModalBodyContainer>
        <form
          className="flex flex-col gap-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            label="Enter event category"
            {...register("name", { required: true })}
            error={errors.name}
            placeholder="Enter event category"
          />
          <div className="">
            <ModalButton
              text="Submit"
              variant="primary"
              loading={mutation.isLoading || editmutation.isLoading}
              disabled={data?.name === name}
            />
          </div>
        </form>
      </ModalBodyContainer>
    </div>
  );
};
