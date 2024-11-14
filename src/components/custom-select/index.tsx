import clsx from "clsx";
import React, { SelectHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string | React.ReactNode;
  error?: FieldError;
  options: { value: string; label: string }[];
}

const CustomSelect: React.FC<InputProps> = React.forwardRef(
  (
    { label, className, error, options, required, ...rest },
    ref: React.ForwardedRef<HTMLSelectElement>
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
            <select
              className={clsx(
                "outline-none transition-all duration-200 text-base dark:bg-transparent  border rounded-xl px-4 py-3 h-[2.5rem] md:h-[3rem]  w-full",
                "border-[#CBD5E1] dark:border-opacity-40 dark:text-white focus:ring-2 focus:ring-primary focus:ring-opacity-40",
                className
              )}
              {...rest}
              ref={ref}
            >
              {options.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="h-4">
          {error && (
            <span className="text-xs text-red-500 font-medium">
              {error.message || "field required"}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default CustomSelect;
