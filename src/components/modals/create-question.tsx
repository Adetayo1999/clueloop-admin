import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { QuestionType } from "../../lib/types";
import CustomTextarea from "../textarea";
import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { useModal } from "../../context/modal";

interface FormType {
  title: string;
  options: { value: string; score: string; id: number }[];
}

export const CreateQuestion: React.FC<{
  data?: QuestionType;
  isEdit?: boolean;
  category_id: number;
}> = ({ data, isEdit, category_id }) => {
  const { setModalContent } = useModal();

  const schema = yup.object().shape({
    title: yup.string().required("Question title is required"),
    options: yup
      .array()
      .required("options is required")
      .of(
        yup.object().shape({
          id: yup.number().required(),
          value: yup.string().required("Answer text is required"),
          score: yup
            .string()
            .typeError("score must be a number")
            .required("score are required")
            .min(0, "score cannot be negative"),
        })
      ),
  });

  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormType>({
    defaultValues: {
      title: "",
      options: [{ value: "", score: "", id: 1 }],
    },
    resolver: yupResolver(schema),
  });

  const values = watch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: services.createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries("questions");
    },
  });

  const editMutation = useMutation({
    mutationFn: services.updateQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries("questions");
    },
  });

  const onSubmit: SubmitHandler<FormType> = async (values) => {
    console.log(values);
    if (isEdit && data) {
      editMutation
        .mutateAsync({
          ...values,
          category_id: data.category_id,
          id: data.id,
          _method: "put",
        })
        .then(() => {
          toast.success("question updated successfully");
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
      .mutateAsync({ ...values, category_id })
      .then(() => {
        toast.success("questioncreated successfully");
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
    if (data) {
      reset(data);
    } else {
      reset({
        title: "",
        options: [{ value: "", score: "", id: 1 }],
      });
    }
  }, [data, reset]);

  return (
    <div className="">
      <ModalHeaderContainer>
        <ModalTitle title={isEdit ? "Edit Question" : "Create Question"} />
        <ModalCloseButton />
      </ModalHeaderContainer>
      <ModalBodyContainer>
        <form
          className="flex flex-col gap-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomTextarea
            label="Enter questionn"
            {...register("title", { required: true })}
            error={errors.title}
            placeholder="Enter question"
            rows={5}
          />
          <div className="">
            <h4 className="mb-5 text-lg text-[#101828] dark:text-slate-100 font-semibold">
              Options
            </h4>
            <div className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-6">
                {fields.map((_, idx) => (
                  <div
                    className="flex justify-between items-end gap-x-3"
                    key={idx}
                  >
                    <div className="flex-1">
                      <CustomInput
                        label="Option Value"
                        {...register(`options.${idx}.value`)}
                        showError={false}
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <CustomInput
                        label="Points"
                        {...register(`options.${idx}.score`)}
                        showError={false}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="text-red-600 w-[3rem] flex justify-center items-center  h-[3rem]  px-2 rounded-md flex-shrink-0"
                    >
                      <XMarkIcon className="size-8" />
                    </button>
                  </div>
                ))}
              </div>
              {!isEdit && (
                <button
                  type="button"
                  onClick={() => append({ value: "", score: "", id: 1 })}
                  className="text-primary w-fit text-sm "
                >
                  + Add Answer
                </button>
              )}
            </div>
          </div>
          <div className="">
            <ModalButton
              text="Submit"
              variant="primary"
              loading={createMutation.isLoading || editMutation.isLoading}
              disabled={
                isEdit ? JSON.stringify(values) === JSON.stringify(data) : false
              }
            />
          </div>
        </form>
      </ModalBodyContainer>
    </div>
  );
};
