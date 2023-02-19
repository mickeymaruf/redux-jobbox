import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import { signIn, signInWithGoogle } from "../features/user/userSlice";
const Login = () => {
  const navigate = useNavigate();
  // redux
  const dispatch = useDispatch();
  const { user: { email }, isLoading, isError, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Logging in...", { id: "auth" });
    }
    if (!isLoading && isError) {
      toast.error(error, { id: "auth" });
    }
    if (!isLoading && email) {
      toast.success("Logged in!", { id: "auth" });
      navigate("/");
    }
  }, [isLoading, isError, email])
  // redux

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = ({ email, password }) => {
    dispatch(signIn({ email, password }));
  };

  return (
    <div className='flex h-screen items-center'>
      <div className='w-1/2'>
        <img src={loginImage} className='h-full w-full' alt='' />
      </div>
      <div className='w-1/2 grid place-items-center'>
        <div className='bg-[#FFFAF4] rounded-lg grid place-items-center p-10'>
          <h1 className='mb-10 font-medium text-2xl'>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-3'>
              <div className='flex flex-col items-start'>
                <label htmlFor='email' className='ml-5'>
                  Email
                </label>
                <input type='email' {...register("email")} id='email' />
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor='password' className='ml-5'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  {...register("password")}
                />
              </div>
              <div className='relative !mt-8'>
                <button
                  type='submit'
                  className='font-bold text-white py-3 rounded-full bg-primary w-full'
                >
                  Login
                </button>
              </div>
              <div>
                <p>
                  Don't have an account?{" "}
                  <span
                    className='text-primary hover:underline cursor-pointer'
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </form>
          <button onClick={() => dispatch(signInWithGoogle())} className="mt-3 text-center w-full border border-primary hover:bg-primary hover:text-white font-medium p-2.5 hover:font-bold duration-200 rounded-full">Login with Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
