import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import productSchema from "../schemas/product.schema";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/products.service";
import Calendar from "react-calendar";
import moment from "moment";
import Header from "../components/Header";

export default function AddProduct() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      return navigate("/signin");
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const [reqErrors, setReqErrors] = useState("");
  const [expiresAt, setExpiresAt] = useState(null);

  const onSubmit = async (data) => {
    try {
      let res = await addProduct(data.name, data.email, expiresAt);
      if (res.status === 201) {
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
            <h1 className="font-bold text-3xl text-gray-900 mb-4">
              Add Product
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-6 pb-8">
            <div className="mb-6">
              <input
                type="text"
                id="email"
                {...register("email")}
                placeholder="Users email"
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
                type="name"
                id="name"
                {...register("name")}
                placeholder="Product name"
                className={`input-field border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500`}
              />
              {errors.name && (
                <p className="error-message text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <Calendar
                onChange={(val) => {
                  setExpiresAt(moment(val).format());
                }}
              />
            </div>
            <div className="flex justify-between items-center mb-[1rem]">
              <button type="submit">Add product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
