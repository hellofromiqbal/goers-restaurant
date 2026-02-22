import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import { useForm, type SubmitHandler } from "react-hook-form";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();

  const handleLogin: SubmitHandler<LoginFormInputs> = async ({ email, password }) => {
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.token);
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete restaurant. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/" className="flex items-center justify-center bg-teal-600 hover:bg-teal-500 transition rounded-full w-8 h-8 p-2">
          <IoArrowBack className="text-white"/>
        </Link>
        <h1 className="text-2xl font-bold">
          Login Admin
        </h1>
      </div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleLogin)}>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Enter email"
            className="p-2 rounded-md bg-gray-100 focus:bg-white"
            {...register("email", { required: "Email is required" })}
            autoFocus
          />
          {errors.email && <span className="text-small text-red-500">{errors.email.message}</span>}
          
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            placeholder="Enter password"
            type="password"
            className="p-2 rounded-md bg-gray-100 focus:bg-white"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span className="text-small text-red-500">{errors.password.message}</span>}
        </div>
        <div className="mt-6 flex items-center justify-end">
        <button
          className="bg-teal-600 hover:bg-teal-500 transition text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50"
        >
          Login
        </button>
      </div>
      </form>
    </div>
  );
}