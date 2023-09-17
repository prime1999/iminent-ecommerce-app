import React from "react";
import { motion } from "framer-motion";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiMailSend } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const containerVariants = {
  initial: {
    x: "100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
};

const buttonVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 1.5,
    },
  },
  hover: {
    textShadow: "0px 0px 18px rgb(255, 255, 255)",
    boxShadow: "0px 0px 18px rgb(93, 63, 211)",
  },
};

const locationVariants = {
  initial: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    transition: {
      delay: 1,
      type: "spring",
      stiffness: 120,
    },
  },
};

const Contact = () => {
  const position = [37.763972, -122.421242]; // Set the initial map position
  return (
    <>
      <div className="w-full mt-16">
        <h1 className="uppercase text-center font-poppins font-bold text-orange text-3xl">
          Get In Touch
        </h1>
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="visible"
          className="w-full h-full"
        >
          <div className="flex flex-col items-center justify-center w-full text-center h-full font-poppins text-md text-[#5D3FD3]">
            <form className="w-full flex items-center justify-center">
              <div className="w-full flex flex-col py-4 px-4 md:w-8/12">
                <div className="flex justify-center w-full mb-4">
                  <input
                    className="bg-[#E5E4E2] py-2 px-4 w-5/12 mr-2 rounded-md focus:outline-none focus:bg-[#C0C0C0]"
                    type="text"
                    name="name"
                    placeholder="Last-name"
                  />
                  <input
                    className="bg-[#E5E4E2] py-2 px-4 w-1/2 ml-2 rounded-md focus:outline-none focus:bg-[#C0C0C0]"
                    type="text"
                    name="name"
                    placeholder="First-name"
                  />
                </div>
                <div className="flex justify-center w-full mb-4">
                  <input
                    className="bg-[#E5E4E2] py-2 px-4 w-5/12 mr-2 rounded-md focus:outline-none focus:bg-[#C0C0C0]"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                  />
                  <input
                    className="bg-[#E5E4E2] py-2 px-4 w-1/2 ml-2 rounded-md focus:outline-none focus:bg-[#C0C0C0]"
                    type="tel"
                    name="telphone"
                    placeholder="Enter your phone-number"
                  />
                </div>
                <div className="w-full">
                  <textarea
                    className="w-11/12 bg-[#E5E4E2] py-2 px-4 rounded-md focus:outline-none focus:bg-[#C0C0C0]"
                    name="message"
                    placeholder="Message"
                  />
                </div>
                <div className="flex items-center justify-center mt-4">
                  <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    animate="visible"
                    whileHover="hover"
                    className="bg-[#5D3FD3] py-4 rounded-full text-white w-[150px]"
                  >
                    Send Message
                  </motion.button>
                </div>
              </div>
            </form>
            <motion.div
              variants={locationVariants}
              initial="initial"
              animate="visible"
              className="flex flex-col items-center justify-between w-9/2 mt-8 text-white md:flex-row"
            >
              <div
                style={{
                  backgroundColor: `rgba(0, 0, 0, 0.8)`,
                }}
                className="relative flex justify-center px-8 py-8 mr-4 mt-8"
              >
                <div className="absolute -top-5">
                  <BsFillTelephoneFill className="flex items-center justify-center text-center rounded-full bg-white text-black text-sm p-2 w-[40px] h-[40px]" />
                </div>
                <p>+234-7085-289-675</p>
              </div>
              <div
                style={{
                  backgroundColor: `rgba(0, 0, 0, 0.8)`,
                }}
                className="relative flex justify-center px-8 py-8 mr-4 mt-8"
              >
                <div className="absolute -top-5">
                  <BiMailSend className="flex items-center justify-center text-center rounded-full bg-white text-black text-sm p-2 w-[40px] h-[40px]" />
                </div>
                <p>info@iminent.com</p>
              </div>
              <div
                style={{
                  backgroundColor: `rgba(0, 0, 0, 0.8)`,
                }}
                className="relative flex justify-center px-8 py-8 mt-8"
              >
                <div className="absolute -top-5">
                  <FaMapMarkerAlt className="flex items-center justify-center text-center rounded-full bg-white text-black text-sm p-2 w-[40px] h-[40px]" />
                </div>
                <p>san-fransisco, USA</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <div className="mt-32 mb-8 w-10/12 h-[500px] mx-auto">
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Iminent Stores <br /> Customer service.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Contact;
