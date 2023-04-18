import { useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //Send password reset link to their email and then redirect them to the sign-in page
    try {
      await sendPasswordResetEmail(auth, email);
      navigate("/sign-in");
      toast.info("Please check your email for reset link");
    } catch (error) {
      toast.error("wrong user credentials");
    }
  };

  return (
    <div className="flex flex-col justify-center mx-auto w-[450px]">
      <div className="text-center py-8">
        <h1 className="flex flex-col text-3xl font-right logo">
          IMINENT{" "}
          <span className="text-orange text-xl font-poppins -mt-2 tracking-widest font-normal">
            store
          </span>
        </h1>
      </div>
      <div className="flex flex-col justify-center rounded-3xl drop-shadow-lg bg-white w-full py-8">
        <form
          onSubmit={onSubmit}
          className="flex flex-col h-full justify-center p-2"
        >
          <div className="bg-white mx-auto font-lato text-center w-9/12 mb-8">
            <p className="font-semibold text-xl">
              Enter your valid email address to get password reset link
            </p>
          </div>
          <div className="relative flex justify-center">
            <input
              type="text"
              placeholder="Enter your username"
              id="name"
              value={email}
              onChange={onChange}
              className="w-10/12 mx-auto bg-inherit mb-2 border border-darkGray px-2 h-10 rounded-md focus:outline-0"
            />
            <BiMailSend className="absolute top-3 mr-2 right-12 text-lg" />
          </div>

          <button className="bg-orange w-10/12 my-4 mx-auto h-10 rounded-md text-white font-poppins font-semibold uppercase hover:text-orange hover:bg-white">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
