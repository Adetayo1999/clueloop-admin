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
import {
  OpportunityType,
  QuestionnaireQualifierType,
  QuestionnaireType,
} from "../../lib/types";
import { useModal } from "../../context/modal";
import CustomTextarea from "../textarea";
import toast from "react-hot-toast";
import { useEffect } from "react";
import CustomSelect from "../custom-select";
import clsx from "clsx";
import { errorFormatter } from "../../lib/format-error";

type FormType = {
  description: string;
  action?: string;
  maximum_percentage: string;
  minimum_percentage: string;
  category_id: number;
  action_text: string;
  oppurtunity_id?: string;
  type: "opportunity" | "link" | "";
};

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

  const {
    data: opportunitiesData,
    isLoading: isLoadingOpportunities,
    isFetching: isFetchingOpportunities,
  } = useQuery<OpportunityType[]>(
    ["opportunities"],
    services.getOpportunities,
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

  const formattedOpportunities = opportunitiesData
    ? opportunitiesData.map((item) => ({
        label: item.title,
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
    if (Number(values.minimum_percentage) > Number(values.maximum_percentage)) {
      toast.error(
        "minimum percentage should not be greater than maximum percentage"
      );
      return;
    }

    if (isEdit && data) {
      ediMutation
        .mutateAsync({
          ...values,
          id: data.id,
          _method: "put",
        })
        .then(() => {
          toast.success("qualifier updated successfully");
          reset();
          setModalContent(null);
        })
        .catch((error) => {
          toast.error(errorFormatter(error));
        })
        .finally(() => {});

      return;
    }

    createMutation
      .mutateAsync({ ...values })
      .then(() => {
        toast.success("qualifier created successfully");
        reset();
        setModalContent(null);
      })
      .catch((error) => {
        toast.error(errorFormatter(error));
      })
      .finally(() => {});
  };

  useEffect(() => {
    if (data && isEdit) {
      reset({
        action: data.action,
        action_text: data.action_text || undefined,
        category_id: data.category_id,
        description: data.description,
        oppurtunity_id: data.oppurtunity_id || undefined,
        maximum_percentage: data.maximum_percentage,
        minimum_percentage: data.minimum_percentage,
        type: data.oppurtunity ? "opportunity" : "link",
      });
    }
  }, [isEdit, data, reset]);

  return (
    <div className="">
      <ModalHeaderContainer>
        <ModalTitle title="Create Assessment Qualifier" />
        <ModalCloseButton />
      </ModalHeaderContainer>
      <ModalBodyContainer className="">
        <form
          className="flex flex-col gap-y-8 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-y-8 gap-x-6">
            <CustomSelect
              options={[
                { label: "Select assessment", value: "" },
                ...formattedQuestionnaires,
              ]}
              label="Enter Assessment"
              {...register("category_id", { required: true })}
              error={errors.category_id}
            />
            <CustomInput
              label="Enter CTA Text"
              placeholder="Enter CTA Text"
              error={errors.action_text}
              {...register("action_text", { required: true })}
            />
            <CustomInput
              label="Enter qualifier minimum percentage"
              {...register("minimum_percentage", { required: true })}
              error={errors.minimum_percentage}
              placeholder="Enter qualifier percentage"
              type="number"
            />
            <CustomInput
              label="Enter qualifier maximum percentage"
              {...register("maximum_percentage", { required: true })}
              error={errors.maximum_percentage}
              placeholder="Enter qualifier percentage"
              type="number"
            />
            <div className={clsx(!values.type && "col-span-2")}>
              <CustomSelect
                options={[
                  { label: "Select Action Type", value: "" },
                  { label: "Opportunity", value: "opportunity" },
                  { label: "Link", value: "link" },
                ]}
                label="Select Action Type"
                {...register("type", { required: true })}
                error={errors.type}
              />
            </div>

            {values.type === "link" && (
              <CustomInput
                label="Enter qualifier action (Link)"
                {...register("action", {
                  required: true,
                  pattern: {
                    value:
                      /^https:\/\/([\w\d\-]+\.)+[\w\d\-]+(\/[\w\d\-._~:/?#[\]@!$&'()*+,;=]*)?$/i,
                    message: "URL must start with https:// and be valid",
                  },
                })}
                error={errors.action}
                placeholder="Enter qualifier action"
              />
            )}

            {values.type === "opportunity" && (
              <CustomSelect
                options={[
                  { label: "Select an opportunity", value: "" },
                  ...formattedOpportunities,
                ]}
                label="Enter qualifier action (Opportunity)"
                {...register("oppurtunity_id", { required: true })}
                error={errors.oppurtunity_id}
              />
            )}
          </div>

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
                isFetching ||
                isFetchingOpportunities ||
                isLoadingOpportunities
              }
              disabled={JSON.stringify(values) === JSON.stringify(data)}
            />
          </div>
        </form>
      </ModalBodyContainer>
    </div>
  );
};
