import { useState } from "react";
import {
  ModalBodyContainer,
  ModalButton,
  ModalCloseButton,
  ModalFooterContainer,
  ModalHeaderContainer,
} from "../modal";
import { useModal } from "../../context/modal";

interface DeleteDialogModalProps {
  title: string;
  description?: string;
  actionHandler: () => Promise<unknown>;
  cb?: VoidFunction;
  successCb?: VoidFunction;
}

export const DeleteDialogModal: React.FC<DeleteDialogModalProps> = ({
  title,
  description = "Are you sure you want to Delete? All the Information assigned to it will be remove.",
  actionHandler,
  cb,
  successCb,
}) => {
  const { setModalContent } = useModal();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setModalContent(null);
  };

  const handleAction = async () => {
    setLoading(true);
    actionHandler()
      .then(() => successCb?.())
      .finally(() => {
        setLoading(false);
        cb?.();
        handleClose();
      });
  };

  return (
    <div>
      <ModalHeaderContainer className="border-none">
        <div className="">
          <svg
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="3" width="40" height="40" rx="20" fill="#FEE4E2" />
            <rect
              x="3"
              y="3"
              width="40"
              height="40"
              rx="20"
              stroke="#FEF3F2"
              strokeWidth="6"
            />
            <path
              d="M26.3333 18.0003V17.3337C26.3333 16.4002 26.3333 15.9335 26.1517 15.577C25.9919 15.2634 25.7369 15.0084 25.4233 14.8486C25.0668 14.667 24.6001 14.667 23.6667 14.667H22.3333C21.3999 14.667 20.9332 14.667 20.5767 14.8486C20.2631 15.0084 20.0081 15.2634 19.8483 15.577C19.6667 15.9335 19.6667 16.4002 19.6667 17.3337V18.0003M21.3333 22.5837V26.7503M24.6667 22.5837V26.7503M15.5 18.0003H30.5M28.8333 18.0003V27.3337C28.8333 28.7338 28.8333 29.4339 28.5608 29.9686C28.3212 30.439 27.9387 30.8215 27.4683 31.0612C26.9335 31.3337 26.2335 31.3337 24.8333 31.3337H21.1667C19.7665 31.3337 19.0665 31.3337 18.5317 31.0612C18.0613 30.8215 17.6788 30.439 17.4392 29.9686C17.1667 29.4339 17.1667 28.7338 17.1667 27.3337V18.0003"
              stroke="#D92D20"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <ModalCloseButton />
      </ModalHeaderContainer>
      <ModalBodyContainer>
        <h2 className="font-bold text-[#101828] dark:text-gray-50 text-2xl mb-1">
          {title}
        </h2>
        <p className="text-base text-[#475467] dark:text-gray-400">
          {description}
        </p>
      </ModalBodyContainer>
      <ModalFooterContainer>
        <ModalButton
          text="Cancel"
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            handleClose();
          }}
        />
        <ModalButton
          text="Delete"
          variant="danger"
          onClick={handleAction}
          loading={loading}
        />
      </ModalFooterContainer>
    </div>
  );
};
