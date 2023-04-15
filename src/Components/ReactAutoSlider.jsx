import { useContext, useState, useEffect } from "react";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Maincontext from "../Context/MainContext";
import TimeContext from "../Context/TimeContext";

const ReactAutoSlider = () => {
  const { viewed, loading } = useContext(Maincontext);
  const { countDown } = useContext(TimeContext);

  let settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="">
      <div className="flex">
        <h1 className="border-r w-[150px] font-lato font-bold text-lg">
          Deals of the day
        </h1>
        <p className="ml-8 font-lato text-red-500 font-bold">{countDown}</p>
      </div>
      <Slider {...settings}>
        {viewed.map((views) => (
          <div key={views.id} className="h-[200px]">
            <div className="h-full my-8">
              <div
                style={{
                  background: `url(${views.image}) center no-repeat`,
                  backgroundSize: "130px",
                  backgroundColor: "white",
                }}
                className="relative h-full mx-2 bg-white shadow-3xl"
              >
                <div className="absolute top-5 right-5 font-poppins bg-orange p-4 w-[80px] text-center discountItems">
                  <h1 className="text-white font-bold text-xl">
                    20% <span className="font-normal">off</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReactAutoSlider;
