/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { InputHTMLAttributes, useState, forwardRef } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { LoginRequestBodyType } from "../../services/types";
import services from "../../services";
import { storeUserData, storeUserToken } from "../../lib/storage";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";

interface LoginInputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  labelText: string;
  error?: FieldError;
}

const LoginInput: React.FC<LoginInputProps> = forwardRef(
  (
    { Icon, labelText, error, onFocus, onBlur, ...rest },
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <div className="w-full">
        <div className="w-full relative ">
          <label
            htmlFor="username"
            className={clsx({
              "absolute transition-all flex items-center gap-x-2 left-2 pointer-events-none  duration-300":
                true,
              "-top-3 text-xs  font-semibold p-1": isActive,
              "text-lg top-4  text-gray-300 ": !isActive,
              "text-primary": isActive && !error,
              "text-red-600": isActive && error,
            })}
          >
            <span>
              <Icon className={clsx(isActive ? "size-4" : "size-6")} />
            </span>
            <span>{labelText}</span>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className={clsx(
              "border-b-2 h-[4rem] text-xl  dark:text-gray-300 text-gray-700 bg-transparent  px-3  outline-none w-full",
              !isActive && "border-black  border-opacity-10",
              isActive && !error && "border-primary",
              isActive && error && "border-red-600"
            )}
            onFocus={(e) => {
              setIsActive(true);
              if (onFocus) onFocus(e);
            }}
            onBlur={(e) => {
              setIsActive(e.target.value !== "");
              if (onBlur) onBlur(e);
            }}
            {...rest}
            autoComplete="off"
            ref={ref}
          />
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

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    clearErrors,
    reset,
  } = useForm<LoginRequestBodyType>();

  const navigate = useNavigate();

  const handleLogin: SubmitHandler<LoginRequestBodyType> = async (data) => {
    try {
      clearErrors();
      const response = await services.login(data);
      console.log(response);
      storeUserData(response.user);
      storeUserToken(response.access_token);
      reset();

      navigate(paths.dashboard.home);
    } catch (error: any) {
      if (error?.email?.length > 0) {
        setError("email", {
          message: error.email[0],
        });
      }

      if (error?.password?.length > 0) {
        setError("password", {
          message: error.password[0],
        });
      }
    }
  };

  return (
    <div className="w-[80%] md:h-[60%] xl:w-[40%] relative z-[100] border dark:border-gray-500 dark:border-opacity-40    2xl:w-[28%]  p-16 pt-24 rounded-3xl bg-white dark:bg-gray-900 ">
      <div className="mb-14 md:mb-20">
        <h1 className="text-center text-3xl font-bold dark:text-gray-100 text-slate-800 ">
          Login
        </h1>
      </div>
      <form
        className="w-full flex flex-col gap-y-12"
        onSubmit={handleSubmit(handleLogin)}
      >
        <LoginInput
          Icon={UserIcon}
          labelText="Enter Email"
          type="email"
          id="email"
          {...register("email", { required: true })}
          error={errors.email}
        />
        <div className="flex items-start flex-col gap-y-4">
          <LoginInput
            labelText="Enter Password"
            Icon={LockClosedIcon}
            type="password"
            {...register("password", { required: true })}
            error={errors.password}
          />
          <button className="text-sm text-gray-600 font-semibold hover:text-primary">
            Forgot Password?
          </button>
        </div>
        <div className="flex flex-col gap-y-10 justify-center items-center mt-6">
          <button
            className={clsx(
              "bg-gradient   min-w-80 text-white rounded-full py-5 text-base font-bold"
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
          <button className="text-base text-gray-600  font-semibold hover:text-primary">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};
