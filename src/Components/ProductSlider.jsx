import { useEffect, useContext } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Maincontext from "../Context/MainContext";
import { Link } from "react-router-dom";

const ProductSlider = ({ data }) => {
  const { categories, dispatch } = useContext(Maincontext);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios(
        `https://fakestoreapi.com/products/category/${data?.category}`
      );
      dispatch({ type: "GET_CATEGORIES", payload: res.data });
    };
    fetchCategories();
  }, []);

  let settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category.id} className="h-[200px]">
            <Link to={`/product-details/${category.id}`}>
              <div className="h-full my-8">
                <div
                  style={{
                    background: `url(${category.image}) center no-repeat`,
                    backgroundSize: "130px",
                    backgroundColor: "white",
                  }}
                  className="relative h-full mx-2 bg-white shadow-3xl"
                ></div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
