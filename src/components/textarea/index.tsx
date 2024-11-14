import React, { TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import clsx from "clsx";

interface CustomTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | React.ReactNode;
  error?: FieldError;
}

const CustomTextarea: React.FC<CustomTextareaProps> = React.forwardRef(
  (
    { label, className, error, required, ...rest },
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
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
        <div className="flex flex-col gap-y-2 mb-1">
          {label && renderInputLabel()}
          <div className="relative">
            <textarea
              className={clsx(
                "outline-none transition-all duration-200 text-base dark:bg-transparent  border rounded-xl px-4 py-3  w-full",
                "border-[#CBD5E1] dark:border-opacity-40 dark:text-white focus:ring-2 focus:ring-primary focus:ring-opacity-40",
                className
              )}
              {...rest}
              ref={ref}
            ></textarea>
          </div>
        </div>
        <div className="h-4">
          {error && (
            <span className="text-xs text-red-500 font-bold">
              {error.message || "field required"}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default CustomTextarea;