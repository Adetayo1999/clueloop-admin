import { LoginForm } from "../../../components/forms/login-form";

export default function Login() {
  return (
    <div className="min-h-screen md:h-screen flex flex-col justify-center items-center  ">
      <div className="flex justify-center z-[100] items-center mb-5">
        <h1 className="cursive text-5xl font-bold text-primary text-opacity-100">
          ClueLoop
        </h1>
      </div>
      <LoginForm />

      {/* <div className="absolute top-0 w-full h-full left-0   bg-black bg-opacity-40" /> */}
    </div>
  );
}
