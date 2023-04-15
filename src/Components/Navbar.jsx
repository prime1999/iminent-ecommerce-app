import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { RxMagnifyingGlass } from "react-icons/rx";
import {
  RiArrowDownSFill,
  RiShoppingCart2Fill,
  RiAccountPinCircleFill,
} from "react-icons/ri";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  //Log user out
  const onLogOut = () => {
    auth.signOut();
    navigate("/sign-in");
    toast.info("User logged out");
  };

  return (
    <>
      <header className="w-[98%] mx-auto font-right font-bold p-2 pt-6 logo">
        <div className="flex items-center justify-between mb-2">
          <h1 className="flex flex-col text-3xl font-right">
            IMINENT{" "}
            <span className="text-orange text-xl font-poppins -mt-2 tracking-widest font-normal">
              store
            </span>
          </h1>

          <form className="relative">
            <input
              type="text"
              placeholder="Search products"
              className="p-2 w-[400px] border-b font-lato bg-stone-50 focus:outline-0"
            />
            <RxMagnifyingGlass className="absolute top-2 right-2 text-2xl hover:cursor-pointer" />
          </form>
          <div className="flex justify-between items-center">
            {/* account dropdown */}
            <div>
              <button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <div className="flex items-center">
                  <Avatar
                    alt="Remy Sharp"
                    src="https://cdn.pixabay.com/photo/2016/03/26/20/35/young-man-1281282_960_720.jpg"
                  />
                  <p className="flex items-center ml-2 font-poppins text-black font-semibold">
                    Account{" "}
                    <span>
                      <RiArrowDownSFill />
                    </span>
                  </p>
                </div>
              </button>
              {/* Account menu starts */}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <BsFillPersonLinesFill className="mr-2" />{" "}
                  <Link to="/profile">
                    <p className="font-lato font-semibold">Profile</p>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <RiAccountPinCircleFill className="mr-2" />
                  <p className="font-lato font-semibold">My account</p>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  {" "}
                  <div onClick={onLogOut} className="flex items-center">
                    <AiOutlineLogout className="mr-2" />{" "}
                    <p className="font-lato font-semibold">Logout</p>
                  </div>
                </MenuItem>
              </Menu>
            </div>
            {/* Acccount Menu ends */}
            <Link className="font-poppins font-semibold mx-8 hover:text-orange">
              <p className="hover:-mt-2">Orders</p>
            </Link>
            <Link
              to="cart"
              className="flex items-center font-poppins font-semibold hover:text-orange"
            >
              <RiShoppingCart2Fill className="text-orange text-3xl" />
              <p className=" hover:-mt-2">Cart</p>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
