import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import authSchema from "../schemas/auth.schema";
import { signInUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [reqErrors, setReqErrors] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      let res = await signInUser(data.email, data.password);
      if (res.status === 200) {
        localStorage.setItem("authToken", res.data.token);
        return navigate("/");
      }
      if (res.name === "AxiosError")
        setReqErrors(res.response.data.error.message);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div>
      <Header tab="Back ->" url="/" />
      <div className="flex items-center justify-center">
        <div className="py-8 bg-white rounded w-full max-w-md">
          <div className="text-center">
            <h1 className="font-bold text-3xl text-gray-900 mb-4">Sign In</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-6 pb-8">
            <div className="mb-6">
              <input
                type="text"
                id="email"
                {...register("email")}
                placeholder="Your email"
                className={`input-field border ${
                  errors.email || reqErrors
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500`}
              />
              {(errors.email || reqErrors) && (
                <p className="error-message text-red-500 mt-1">
                  {errors?.email?.message ? errors.email.message : reqErrors}
                </p>
              )}
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Your password"
                className={`input-field border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500`}
              />
              {errors.password && (
                <p className="error-message text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center mb-[1rem]">
              <button type="submit">Sign In</button>
            </div>
          </form>
          <div className="flex items-center justify-center items-row">
            <p className="text-sm text-gray-600">Don't have an account?</p>
            <p
              onClick={() => {
                return navigate("/signup");
              }}
              className="text-sm no-underline cursor-pointer mx-1"
            >
              Sign Up
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
