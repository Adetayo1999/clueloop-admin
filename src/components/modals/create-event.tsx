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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { EventCategoryType, EventType } from "../../lib/types";
import { useModal } from "../../context/modal";
import CustomTextarea from "../textarea";
import { fetchUserData } from "../../lib/storage";
import CustomSelect from "../custom-select";
import toast from "react-hot-toast";

export const CreateEvent: React.FC<{
  data?: EventType;
  isEdit?: boolean;
}> = ({ data, isEdit }) => {
  const { setModalContent } = useModal();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<{ title: string; content: string; category_id: number }>({
    defaultValues: {
      title: data?.title,
      content: data?.content,
      category_id: data?.category_id,
    },
  });

  const { data: eventCategories } = useQuery<EventCategoryType[]>(
    ["eventCategories"],
    services.getEventsCategory,
    {
      refetchOnWindowFocus: false,
    }
  );

  const formattedCategories = eventCategories
    ? eventCategories.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }))
    : [];

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: isEdit && data ? services.updateEvent : services.createEvent,
    onSuccess: () => {
      // Invalidate and refetch posts after a successful mutation
      queryClient.invalidateQueries("events");
    },
  });

  const onSubmit: SubmitHandler<{
    title: string;
    content: string;
    category_id: number;
  }> = async (values) => {
    if (isEdit && data) {
      const updatedData = { ...data, ...values };
      mutation
        .mutateAsync(updatedData)
        .then(() => {
          toast.success("event updated successfully");
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

    const user = fetchUserData();

    if (!user) return;

    mutation
      .mutateAsync({ ...values, user_id: user.id })
      .then(() => {
        toast.success("event created successfully");
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
        <ModalTitle title="Create Event" />
        <ModalCloseButton />
      </ModalHeaderContainer>
      <ModalBodyContainer>
        <form
          className="flex flex-col gap-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            label="Enter event title"
            {...register("title", { required: true })}
            error={errors.title}
            placeholder="Enter event title"
          />
          <CustomSelect
            options={[
              { label: "Select event category", value: "" },
              ...formattedCategories,
            ]}
            label="Enter event category"
            {...register("category_id", { required: true })}
            error={errors.category_id}
          />
          <CustomTextarea
            label="Enter event content"
            {...register("content", { required: true })}
            error={errors.content}
            placeholder="Enter event content"
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
