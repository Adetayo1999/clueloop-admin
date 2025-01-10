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
import { useEffect, useState } from "react";
import { FileRejection } from "react-dropzone";
import CustomDropzone from "../custom-dropdown";

type FormType = Omit<
  QuestionnaireType,
  "id" | "created_at" | "updated_at" | "type"
>;

const DEFAULT_IMAGE_URL =
  "https://clueloop.quickgeosearch.com.ng/images/default-banner.jpg";

export const CreateQuestionnaire: React.FC<{
  data?: QuestionnaireType;
  isEdit?: boolean;
}> = ({ data, isEdit }) => {
  const { setModalContent } = useModal();
  const [banner, setBanner] = useState<File>();
  const [imagePreview, setImagePreview] = useState(data?.banner || "");
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({});

  const queryClient = useQueryClient();

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
      setBanner(files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };

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
        .mutateAsync({
          ...values,
          id: data.id,
          _method: "put",
          banner,
          type: "Assessment",
        })
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

    if (!banner) {
      toast.error("Banner image required");
      return;
    }

    createMutation
      .mutateAsync({ ...values, banner, type: "Assessment" })
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
                maxSize={1500000}
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
            label="Enter questionnaire name"
            {...register("name", { required: true })}
            error={errors.name}
            placeholder="Enter questionnaire name"
          />

          <CustomTextarea
            label="Enter questionnaire description"
            {...register("description", { required: true })}
            error={errors.description}
            placeholder="Enter questionnaire description"
            rows={5}
          />

          <div className="">
            <ModalButton
              text="Submit"
              variant="primary"
              loading={createMutation.isLoading || ediMutation.isLoading}
            />
          </div>
        </form>
      </ModalBodyContainer>
    </div>
  );
};
