import { useContext, useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { RxMagnifyingGlass } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import {
  RiArrowDownSFill,
  RiShoppingCart2Fill,
  RiAccountPinCircleFill,
} from "react-icons/ri";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { useAuthStatus } from "../Hooks/useAuthStatus";
import Loader from "./Loader";
import { toast } from "react-toastify";
import CartContext from "../Context/CartContext";
import Maincontext from "../Context/MainContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { getCategory, category } = useContext(Maincontext);
  const { loggedIn, checkingStatus } = useAuthStatus();
  const [placeholder, setPlaceholder] = useState("Search");
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    category.forEach((category) => {
      setPlaceholder(category.toString());
    });
  });

  const cartItems = cart.length;

  //Cart icon badge
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 3,
      top: 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const navigate = useNavigate();

  //Log user out
  const onLogOut = () => {
    auth.signOut();
    navigate("/sign-in");
    toast.info("User logged out");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getCategory(value);
  };

  if (checkingStatus) {
    return <Loader />;
  }

  return (
    <>
      <header className="w-[98%] mx-auto font-right font-bold p-2 pt-6 logo">
        <div className="flex items-center justify-between mb-2">
          <Link to="/">
            <h1 className="flex flex-col text-3xl font-right">
              IMINENT{" "}
              <span className="text-orange text-xl font-poppins -mt-2 tracking-widest font-normal">
                store
              </span>
            </h1>
          </Link>
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className="p-2 w-[500px] border-b font-lato bg-stone-50 focus:outline-0"
            />
            <RxMagnifyingGlass
              onClick={handleSubmit}
              className="absolute top-2 right-2 text-2xl hover:cursor-pointer"
            />
          </form>
          <div className="flex justify-between items-center">
            {loggedIn ? (
              <>
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
                        Hi {auth?.currentUser?.displayName}{" "}
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
                      <Link to="/coming-soon">
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
              </>
            ) : (
              <Link to="/sign-in" className="flex items-center mr-8">
                <FaUserCircle className="text-3xl text-orange" />
                <h1 className="font-poppins ml-2">Sign-In</h1>
              </Link>
            )}
            <Link
              to="cart"
              className="flex items-center font-poppins font-semibold hover:text-orange"
            >
              <IconButton>
                <StyledBadge
                  badgeContent={cartItems}
                  color="primary"
                ></StyledBadge>
                <RiShoppingCart2Fill className="text-orange text-3xl" />
              </IconButton>
              <p className=" hover:-mt-2">Cart</p>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
