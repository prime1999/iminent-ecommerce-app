import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const TopSection = () => {
  const images = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    "https://cdn.pixabay.com/photo/2017/03/13/17/26/ecommerce-2140604_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/01/15/12/46/woman-600225_960_720.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <>
      <div className="h-[500px] w-full">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <div
                style={{
                  background: `url(${image}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="relative w-full h-[500px]"
              >
                <div
                  className="absolute w-full h-full top-0"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  {/* styling for the first slider image */}
                  {index === 0 ? (
                    <div className="font-poppins w-1/2 text-center text-white lg:w-1/2">
                      <h1 className="font-bold text-[80px] tracking-widest lg:text-[100px]">
                        SALE
                      </h1>
                      <p className="-mt-4 text-sm">Get our products at</p>
                      <h2 className="text-[50px] font-bold">20% OFF</h2>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* styling for the second slider image */}
                  {index === 2 ? (
                    <div className="ml-4 font-poppins w-full text-white">
                      <h1 className="font-bold text-[90px] tracking-wider">
                        WE SELL
                      </h1>
                      <p className="-mt-8 text-[60px] font-bold lg:text-[90px]">
                        EVERYTHING
                      </p>
                      <h2 className="text-[50px] font-bold">YOU WANT</h2>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="w-full flex justify-between top-2/4 sliderFlex"></div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default TopSection;
