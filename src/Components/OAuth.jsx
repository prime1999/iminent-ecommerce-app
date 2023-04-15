import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const OAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const signUpWIthGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);

      //check if user already exist
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      //if user doesn't exist - Add user
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
      toast.success(
        `user Signed ${location.pathname === "/sign-up" ? "up" : "in"}`
      );
    } catch (error) {
      toast.error("Wrong credentials");
    }
  };
  return (
    <div>
      <Link>
        <div
          onClick={signUpWIthGoogle}
          className="flex items-center justify-center w-10/12 mx-auto mb-4 rounded-lg border px-4 p-2"
        >
          <AiOutlineGoogle className="text-3xl" />
          <p className="font-poppins font-bold ml-4">Google</p>
        </div>
      </Link>
    </div>
  );
};

export default OAuth;
