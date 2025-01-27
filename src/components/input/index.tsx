import React, { InputHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form";
import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  error?: FieldError;
  showError?: boolean;
  maxChars?: number;
}

const CustomInput: React.FC<CustomInputProps> = React.forwardRef(
  (
    {
      label,
      className,
      error,
      type,
      name,
      required,
      showError = true,
      maxChars = 255,
      ...rest
    },
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handlePasswordToggle = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      setIsPasswordVisible((prev) => !prev);
    };

    const renderInputLabel = () => {
      if (typeof label === "string")
        return (
          <label
            className={clsx(
              `text-sm font-semibold dark:text-gray-100 text-[#344054]`,
              required
                ? "relative after:absolute after:content-['*'] after:text-red-600"
                : ""
            )}
          >
            {label}
          </label>
        );
      return label;
    };

    return (
      <div>
        <div className="flex flex-col gap-y-2">
          {label && renderInputLabel()}
          <div className="relative">
            <input
              className={clsx(
                "outline-none transition-all dark:border-gray-500 dark:border-opacity-50 duration-200 text-base dark:bg-transparent  border rounded-xl px-4 py-3 h-[2.5rem] md:h-[3rem]  w-full",
                "border-[#CBD5E1] dark:border-opacity-40 dark:text-white focus:ring-2 focus:ring-primary focus:ring-opacity-40",
                type === "password" ? "pr-8" : "",
                className
              )}
              type={isPasswordVisible ? "text" : type}
              name={name}
              {...rest}
              ref={ref}
              required={required}
            />
            {name?.includes("password") && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={handlePasswordToggle}
              >
                {!isPasswordVisible ? (
                  <EyeIcon className=" text-gray-700 hover:text-gray-900 " />
                ) : (
                  <EyeSlashIcon className=" text-gray-700 hover:text-gray-900" />
                )}
              </button>
            )}
          </div>
        </div>
        {showError && (
          <div className="h-4 mt-1">
            {error ? (
              <span className="text-xs text-red-500 font-bold">
                {error.message || "field required"}
              </span>
            ) : (
              <span className="text-xs text-gray-500 font-medium ">
                Maximum {maxChars} characters allowed.
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default CustomInput;
