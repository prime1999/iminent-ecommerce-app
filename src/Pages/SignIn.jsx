import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineGoogle } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import OAuth from "../Components/OAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const usercredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (usercredentials.user) {
        navigate("/");
        toast.success("User logged in");
      }
    } catch (error) {
      toast.error("Wrong credentials");
    }
  };

  return (
    <div className="flex flex-col justify-center mx-auto w-[450px] h-screen">
      <div className="text-center">
        <h1 className="flex flex-col text-3xl font-right logo">
          IMINENT{" "}
          <span className="text-orange text-xl font-poppins -mt-2 tracking-widest font-normal">
            store
          </span>
        </h1>
      </div>
      <div className="flex flex-col justify-center rounded-3xl drop-shadow-lg bg-white w-full h-5/6">
        <form
          onSubmit={onSubmit}
          className="flex flex-col h-full justify-center p-2"
        >
          <div className="bg-white mx-auto font-lato text-center w-9/12 mb-8">
            <h1 className="text-3xl font-bold mb-2">Customer Login</h1>
            <p className="font-semibold">
              Hey, Enter your details to get sign in to your account
            </p>
          </div>
          <div className="relative flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              value={email}
              onChange={onChange}
              className="w-10/12 mx-auto bg-inherit border border-darkGray px-2 h-10 rounded-md focus:outline-0"
            />
            <BiMailSend className="absolute top-3 mr-2 right-12 text-lg" />
          </div>
          <div className="relative flex justify-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              id="password"
              value={password}
              onChange={onChange}
              className="w-10/12 mx-auto bg-inherit border border-darkGray px-2 h-10 rounded-md mt-4 focus:outline-0"
            />
            {showPassword ? (
              <AiFillEyeInvisible
                className="absolute top-8 right-12 mr-2 text-lg"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            ) : (
              <AiFillEye
                className="absolute top-8 right-12 mr-2 text-lg"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            )}
          </div>
          <Link
            to="/forgot-password"
            className="font-lato font-semibold ml-8 my-4"
          >
            Forgot Password
          </Link>
          <button className="bg-orange w-10/12 mb-4 mx-auto h-10 rounded-md text-white font-poppins font-semibold uppercase hover:text-orange hover:bg-white">
            Sign-in
          </button>
          <div className=" flex items-center justify-center mb-4">
            <hr className="w-16" />
            <p className="mx-2 font-poppins">or sign in with</p>
            <hr className="w-16" />
          </div>
          <OAuth />
          <div className="ml-8 font-poppins text-sm">
            <p>
              Don't have an account?{" "}
              <Link to="/sign-up" className="font-bold">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
