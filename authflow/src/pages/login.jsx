import { AuthContext } from "../context/auth-context";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import Loader from "../hooks/loader";
import CopyText from "../hooks/copy-text";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, set_isLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    set_isLoading(true);
    const res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.token) {
      login(result.token); // store in context/localStorage
      toast.success("Logged in successfully!");
      navigate("/dashboard"); // redirect to dashboard
    } else {
      toast.error(result.error);
    }
    set_isLoading(false);
  };

  return (
    <div className="space-y-4 p-4 max-w-md mx-auto my-8 flex flex-col items-center ">
      <h1 className="text-2xl mb-8">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 w-96"
      >
        <input
          {...register("email")}
          placeholder="Email"
          className="border p-2 w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-slate-700 text-white px-4 py-2 w-full"
        >
          <Loader isLoading={isLoading} />
          Login
        </button>
      </form>
      <div>
        <span>Don't have an account?</span>{" "}
        <Link to="/register">
          <span className="text-red-600">Register</span>
        </Link>
      </div>

      <div className="bg-slate-100 text-slate-600 py-2 px-4 m-4  flex flex-col gap-2">
        <span className="text-orange-400">To Login/register Successfully:</span>
        <div className="flex gap-1">
          email: <CopyText text={"eve.holt@reqres.in"} />
        </div>
        <div className="flex gap-1">
          password: <CopyText text={"pistol"} />
        </div>
      </div>
    </div>
  );
}
