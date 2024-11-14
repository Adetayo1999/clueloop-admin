/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ButtonHTMLAttributes, HTMLAttributes, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useModal } from "../../context/modal";

type props = {
  className?: string;
  children: React.ReactNode;
  containerClassName?: string;
};

function CenterModal({ children, className, containerClassName }: props) {
  const { setModalContent } = useModal();

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setModalContent(null)}
        className={clsx(
          "min-h-screen fixed top-0 left-0 z-[25] overflow-y-auto  h-full w-full p-12 bg-black bg-opacity-40 dark:bg-opacity-80",
          containerClassName
        )}
      >
        <motion.section
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          exit={{ y: 20 }}
          className={clsx(
            "  mx-auto max-w-[45%] 2xl:max-w-[40%]  flex justify-between flex-col min-h-[20rem]  rounded-3xl dark:bg-gray-800 bg-white ",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
}

interface ModalContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ModalHeaderContainer = ({
  children,
  className,
  ...rest
}: ModalContainerProps) => {
  return (
    <div
      className={clsx(
        "p-[1.5rem] flex justify-between items-center mb-6 border-b border-[#EAECF0] dark:border-gray-500 dark:border-opacity-40",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export const ModalTitle = ({ title }: { title: string }) => (
  <h1 className="text-[#101828] dark:text-slate-50 font-semibold text-lg capitalize">
    {title}
  </h1>
);

export const ModalCloseButton = ({
  onClick,
  ...rest
}: ButtonHTMLAttributes<any>) => {
  const { setModalContent } = useModal();

  return (
    <button
      className="text-[#667085] size-6 font-bold"
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        setModalContent(null);
      }}
    >
      <XMarkIcon />
    </button>
  );
};

export const ModalBodyContainer = ({
  children,
  className,
  ...rest
}: ModalContainerProps) => {
  return (
    <div
      className={clsx("pb-[1.5rem] px-[1.5rem]  flex-1", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export const ModalFooterContainer = ({
  children,
  className,
}: ModalContainerProps) => {
  return (
    <div
      className={`p-[1.5rem]  items-center  gap-x-6 border-t border-[#EAECF0] flex justify-end dark:border-gray-500 dark:border-opacity-40 ${className}`}
    >
      {children}
    </div>
  );
};

type ButtonVariants = "primary" | "danger" | "secondary";

interface ModalButtonProps extends ButtonHTMLAttributes<any> {
  text: string;
  loading?: boolean;
  variant: ButtonVariants;
}

const baseClassName = "font-bold px-4 py-[0.625rem] text-sm rounded-xl";

const buttonStyles: { [key in ButtonVariants]: string } = {
  danger: "bg-[#D92D20] text-gray-100",
  primary: "text-gray-100 bg-primary",
  secondary:
    "border border-[#D0D5DD] text-[#344054] dark:bg-white dark:border-none",
};

export const ModalButton = ({
  text,
  onClick,
  loading,
  disabled,
  className,
  variant,
  ...rest
}: ModalButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        baseClassName,
        buttonStyles[variant],
        "disabled:bg-opacity-40 disabled:cursor-not-allowed",
        loading ? "bg-opacity-40 animate-pulse" : "",
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {text}
    </button>
  );
};

export default CenterModal;
