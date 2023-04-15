import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsDiscord } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col w-full">
        <div className="w-full mt-8 mx-auto py-8">
          <form className="flex flex-col justify center items-center">
            <input
              type="email"
              placeholder="Email"
              className="w-[400px] h-10 rounded-md pl-2 drop-shadow-md font-poppins focus:outline-0 md:w-[500px]"
            />
            <input
              type="submit"
              value="Subscribe to our News-Letter"
              className="w-[400px] h-10 mt-4 bg-orange rounded-md font-poppins text-white font-bold text-lg hover:cursor-pointer hover:text-orange ease-in-out duration-1000 hover:bg-slate-100 md:w-[500px]"
            />
          </form>
        </div>
        <div className="relative bg-slate-900 h-full -mt-4">
          <h1 className="font-right text-white text-center mt-8 text-4xl">
            IMINENT
          </h1>
          <p className="w-full mx-auto text-white font-lato text-center md:w-1/2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            assumenda sit, architecto corrupti mollitia magnam commodi sed quia
            in voluptate.
          </p>
          <div className="text-white w-full flex justify-center mt-2 mb-16 text-xl">
            <ul className="flex justify-between w-1/2 md:w-1/4">
              <li className="flex justify-center items-center text-center border-2 p-2 rounded-full hover:border-orange hover:text-orange">
                <a href="#">
                  <BsFacebook />
                </a>
              </li>
              <li className="flex justify-center items-center text-center border-2 p-2 rounded-full hover:border-orange hover:text-orange">
                <a href="#">
                  <AiFillTwitterCircle />
                </a>
              </li>
              <li className="flex justify-center items-center text-center border-2 p-2 rounded-full hover:border-orange hover:text-orange">
                <a href="#">
                  <BsInstagram />
                </a>
              </li>
              <li className="flex justify-center items-center text-center border-2 p-2 rounded-full hover:border-orange hover:text-orange">
                <a href="#">
                  <BsLinkedin />
                </a>
              </li>
              <li className="flex justify-center items-center text-center border-2 p-2 rounded-full hover:border-orange hover:text-orange">
                <a href="#">
                  <BsDiscord />
                </a>
              </li>
            </ul>
          </div>
          <div className="absolute bottom-0 flex items-center justify-between px-4 text-darkGray font-lato w-full h-[40px] bg-black">
            <div>
              <h6>
                Designed by{" "}
                <span className="font-poppins font-semibold">PRIME</span>
              </h6>
            </div>
            <div>
              <ul className="flex justify-between items-center">
                <li className="hover:text-orange">
                  <Link>Home</Link>
                </li>
                <li className="ml-2 hover:text-orange">
                  <Link>About</Link>
                </li>
                <li className="mx-2 hover:text-orange">
                  <Link>Contact</Link>
                </li>
                <li className="hover:text-orange">
                  <Link>Blog</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
