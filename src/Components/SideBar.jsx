import React from "react";
import { Link } from "react-router-dom";
import { RiArrowRightSFill } from "react-icons/ri";

const SideBar = () => {
  return (
    <>
      <div className="font-lato font-bold text-md p-4 w-10/12">
        <ul>
          <li className="border-b p-4">
            <Link className="relative">
              <p>Men's Clothing</p>
              <RiArrowRightSFill className="absolute top-2 right-0 text-darkGray" />
            </Link>
          </li>
          <li className="border-b p-4">
            <Link className="relative">
              <p>Women's Clothing</p>
              <RiArrowRightSFill className="absolute top-2 right-0 text-darkGray" />
            </Link>
          </li>
          <li className="border-b p-4">
            <Link className="relative">
              <p>Children Clothing</p>
              <RiArrowRightSFill className="absolute top-2 right-0 text-darkGray" />
            </Link>
          </li>
          <li className="border-b p-4">
            <Link className="relative">
              <p>Jewellries</p>
              <RiArrowRightSFill className="absolute top-2 right-0 text-darkGray" />
            </Link>
          </li>
          <li className="border-b p-4">
            <Link className="relative">
              <p>Electronics</p>
              <RiArrowRightSFill className="absolute top-2 right-0 text-darkGray" />
            </Link>
          </li>
          <li className="border-b p-4">
            <Link className="relative">
              <p>Foot-Wear</p>
              <RiArrowRightSFill className="absolute top-2 right-0 text-darkGray" />
            </Link>
          </li>
          <li className="px-4 pt-4">
            <Link className="relative">
              <p>Other</p>
              <RiArrowRightSFill className="absolute top-2 right-0 text-darkGray" />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
