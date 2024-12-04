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
import { QuestionnaireQualifierType } from "../../lib/types";
import { useModal } from "../../context/modal";
import CustomTextarea from "../textarea";
import toast from "react-hot-toast";
import { useEffect } from "react";

type FormType = Omit<
  QuestionnaireQualifierType,
  "id" | "created_at" | "updated_at"
>;

export const CreateQuestionnaireQualifier: React.FC<{
  data?: QuestionnaireQualifierType;
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
    mutationFn: services.createQuestionnaireQualifier,
    onSuccess: () => {
      queryClient.invalidateQueries("qualify");
    },
  });

  const ediMutation = useMutation({
    mutationFn: services.updateQuestionnaireQualifer,
    onSuccess: () => {
      queryClient.invalidateQueries("qualify");
    },
  });

  const onSubmit: SubmitHandler<FormType> = async (values) => {
    if (isEdit && data) {
      ediMutation
        .mutateAsync({ ...values, id: data.id, _method: "put" })
        .then(() => {
          toast.success("qualifier updated successfully");
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
        toast.success("qualifier created successfully");
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
        <ModalTitle title="Create Questionnaire Qualifier" />
        <ModalCloseButton />
      </ModalHeaderContainer>
      <ModalBodyContainer>
        <form
          className="flex flex-col gap-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            label="Enter qualifier percentage"
            {...register("percentage", { required: true })}
            error={errors.percentage}
            placeholder="Enter qualifier percentage"
            type="number"
          />

          <CustomInput
            label="Enter qualifier action (Link)"
            {...register("action", { required: true })}
            error={errors.action}
            placeholder="Enter qualifier action"
          />

          <CustomTextarea
            label="Enter description"
            {...register("description")}
            error={errors.description}
            placeholder="Enter description"
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
