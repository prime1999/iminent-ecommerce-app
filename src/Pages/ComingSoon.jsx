import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsLinkedin, BsDiscord } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { motion } from "framer-motion";

const headingVariants = {
  initial: {
    y: "-400",
  },
  visible: {
    y: -10,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
};

const paraVariants = {
  initial: {
    x: "-200vw",
  },
  visible: {
    x: 0,
    transition: {
      duration: 2,
    },
  },
};

const linkVariants = {
  initial: {
    y: 200,
  },
  visible: {
    y: 0,
    transition: {
      delay: 2.5,
      duration: 0.5,
      type: "spring",
      stiffness: 120,
    },
  },
};

const ComingSoon = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url('https://cdn.pixabay.com/photo/2020/05/17/20/34/concept-5183469_960_720.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-screen"
      >
        <div
          style={{
            backgroundColor: `rgba(0, 0, 0, 0.5)`,
          }}
          className="fixed bottom-0 top-0 right-0 left-0 w-full z-50"
        >
          <div className="flex items-center justify-center text-center h-full">
            <div className="relative flex flex-col">
              <motion.h1
                variants={headingVariants}
                initial="initial"
                animate="visible"
                className="font-right text-white text-3xl"
              >
                COMING SOON
              </motion.h1>
              <motion.p
                variants={paraVariants}
                initial="initial"
                animate="visible"
                className="text-white font-lato text-lg"
              >
                This page is under development and will be ready soon
              </motion.p>
              <Link
                className="bg-orange text-white font-lato font-bold px-2 py-4 mt-4 w-9/12 mx-auto rounded-lg hover:bg-white hover:text-orange"
                to="/"
              >
                Continue Exploring
              </Link>
              <motion.div
                variants={linkVariants}
                initial="initial"
                animate="visible"
                className="absolute top-60 w-full"
              >
                <div className="text-white w-full flex justify-center text-xl">
                  <ul className="flex justify-between">
                    <li className="flex justify-center items-center mr-2 text-center border-2 p-2 rounded-full hover:border-orange hover:text-orange">
                      <a href="#">
                        <BsFacebook />
                      </a>
                    </li>
                    <li className="flex justify-center items-center text-center border-2 p-2 rounded-full hover:border-orange hover:text-orange">
                      <a href="#">
                        <AiFillTwitterCircle />
                      </a>
                    </li>
                    <li className="flex justify-center items-center mx-2 text-center border-2 p-2 rounded-full hover:border-orange hover:text-orange">
                      <a href="#">
                        <BsInstagram />
                      </a>
                    </li>
                    <li className="flex justify-center items-center text-center border-2 p-2 rounded-full hover:border-orange hover:text-orange">
                      <a href="#">
                        <BsLinkedin />
                      </a>
                    </li>
                    <li className="flex justify-center items-center ml-2 text-center border-2 p-2 rounded-full hover:border-orange hover:text-orange">
                      <a href="#">
                        <BsDiscord />
                      </a>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
