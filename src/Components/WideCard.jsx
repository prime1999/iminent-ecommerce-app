import React from "react";
const WideCard = () => {
  return (
    <div className="w-11/12 mx-auto p-4 border mt-8 h-[400px] text-white">
      <div
        className="flex h-full"
        style={{
          background: `url("https://cdn.pixabay.com/photo/2020/11/04/10/57/girl-5712002_960_720.jpg") center no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <div
          className="w-full h-full p-4 font-lato font-bold"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="w-6/12 text-3xl uppercase md:w-1/3 md:text-3xl">
            <h1>Bid for our winter wears now to get a</h1>
            <p className="text-[50px] text-orange font-poppins md:my-8 md:text-[100px]">
              20% <span className="text-[35px] md:text-[50px]">Discount</span>
            </p>
          </div>
          <div className="mx-auto">
            <button className="p-2 bg-orange px-6 font-poppins rounded-lg hover:bg-white hover:text-orange">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WideCard;
