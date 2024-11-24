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
import { QuestionnaireType } from "../../lib/types";
import { useModal } from "../../context/modal";
import CustomTextarea from "../textarea";
import toast from "react-hot-toast";
import CustomSelect from "../custom-select";
import { useEffect } from "react";

type FormType = Omit<QuestionnaireType, "id" | "created_at" | "updated_at">;

export const CreateQuestionnaire: React.FC<{
  data?: QuestionnaireType;
  isEdit?: boolean;
}> = ({ data, isEdit }) => {
  const { setModalContent } = useModal();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormType>({});

  const values = watch();

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: services.createQuestionnaires,
    onSuccess: () => {
      queryClient.invalidateQueries("questionnaire");
    },
  });

  const ediMutation = useMutation({
    mutationFn: services.updateQuestionnaire,
    onSuccess: () => {
      queryClient.invalidateQueries("questionnaire");
    },
  });

  const onSubmit: SubmitHandler<FormType> = async (values) => {
    if (isEdit && data) {
      ediMutation
        .mutateAsync({ ...values, id: data.id, _method: "put" })
        .then(() => {
          toast.success("questionnaire updated successfully");
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

    createMutation
      .mutateAsync({ ...values })
      .then(() => {
        toast.success("questionnaire created successfully");
      })
      .catch(() => {
        toast.error("something went wrong, try again");
      })
      .finally(() => {
        reset();
        setModalContent(null);
      });
  };

  useEffect(() => {
    if (data && isEdit) {
      reset(data);
    }
  }, [isEdit, data, reset]);

  return (
    <div className="">
      <ModalHeaderContainer>
        <ModalTitle title="Create Questionnaire" />
        <ModalCloseButton />
      </ModalHeaderContainer>
      <ModalBodyContainer>
        <form
          className="flex flex-col gap-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            label="Enter questionnaire name"
            {...register("name", { required: true })}
            error={errors.name}
            placeholder="Enter questionnaire name"
          />
          <CustomSelect
            label="Choose questionnaire Type"
            {...register("type", { required: true })}
            error={errors.type}
            options={[
              {
                label: "Choose type",
                value: "",
              },
              {
                label: "Assessment",
                value: "Assessment",
              },
              {
                label: "Opportunity",
                value: "Opportunity",
              },
            ]}
          />
          <CustomTextarea
            label="Enter questionnaire description"
            {...register("description")}
            error={errors.description}
            placeholder="Enter questionnaire description"
            rows={5}
          />

          <div className="">
            <ModalButton
              text="Submit"
              variant="primary"
              loading={createMutation.isLoading || ediMutation.isLoading}
              disabled={JSON.stringify(values) === JSON.stringify(data)}
            />
          </div>
        </form>
      </ModalBodyContainer>
    </div>
  );
};
