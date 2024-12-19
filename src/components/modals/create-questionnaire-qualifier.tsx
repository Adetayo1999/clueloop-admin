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
import { QuestionnaireQualifierType, QuestionnaireType } from "../../lib/types";
import { useModal } from "../../context/modal";
import CustomTextarea from "../textarea";
import toast from "react-hot-toast";
import { useEffect } from "react";
import CustomSelect from "../custom-select";

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

  const {
    data: questionniareData,
    isLoading,
    isFetching,
  } = useQuery<QuestionnaireType[]>(
    ["questionnaire"],
    services.getQuestionnaires,
    {
      refetchOnWindowFocus: false,
    }
  );

  const formattedQuestionnaires = questionniareData
    ? questionniareData.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }))
    : [];

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
          <CustomSelect
            options={[
              { label: "Select questionnaire", value: "" },
              ...formattedQuestionnaires,
            ]}
            label="Enter questionnaire"
            {...register("category_id", { required: true })}
            error={errors.category_id}
          />
          <CustomInput
            label="Enter qualifier maximum percentage"
            {...register("maximum_percentage", { required: true })}
            error={errors.maximum_percentage}
            placeholder="Enter qualifier percentage"
            type="number"
          />
          <CustomInput
            label="Enter qualifier minimum percentage"
            {...register("minimum_percentage", { required: true })}
            error={errors.minimum_percentage}
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
            {...register("description", { required: true })}
            error={errors.description}
            placeholder="Enter description"
            rows={5}
          />

          <div className="">
            <ModalButton
              text="Submit"
              variant="primary"
              loading={
                createMutation.isLoading ||
                ediMutation.isLoading ||
                isLoading ||
                isFetching
              }
              disabled={JSON.stringify(values) === JSON.stringify(data)}
            />
          </div>
        </form>
      </ModalBodyContainer>
    </div>
  );
};
