import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowRightSFill } from "react-icons/ri";
import { AiOutlineMenuUnfold, AiOutlineLogout } from "react-icons/ai";
import { RiShoppingCart2Fill, RiAccountPinCircleFill } from "react-icons/ri";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { auth } from "../firebase.config";
import { Divider, Drawer, List, ListItem } from "@mui/material";
import SearchModal from "./SearchModal";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  //Log user out
  const onLogOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  return (
    <>
      <header className="p-4 logo">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AiOutlineMenuUnfold
              onClick={handleDrawerOpen}
              className="text-3xl mr-4"
            />
            {/* Menu side drawer starts */}
            <div>
              <Drawer
                anchor="left"
                open={isOpen}
                onClose={handleDrawerClose}
                variant="temporary"
                sx={{
                  "& .MuiDrawer-paper": {
                    width: 240,
                  },
                }}
              >
                <div className="text-center my-4">
                  <h1 className="flex flex-col text-3xl font-right logo">
                    IMINENT{" "}
                    <span className="text-orange text-xl font-poppins -mt-2 tracking-widest font-normal">
                      store
                    </span>
                  </h1>
                </div>
                <Divider />
                <List sx={{ marginTop: "20px", marginBottom: "20px" }}>
                  <ListItem>
                    <Link className="relative w-full hover:text-orange">
                      <p>Men's Clothing</p>
                      <RiArrowRightSFill className="absolute top-2 right-2 text-darkGray" />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link className="relative w-full hover:text-orange">
                      <p>Women's Clothing</p>
                      <RiArrowRightSFill className="absolute top-2 right-2 text-darkGray" />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link className="relative w-full hover:text-orange">
                      <p>Jewellries</p>
                      <RiArrowRightSFill className="absolute top-2 right-2 text-darkGray" />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link className="relative w-full hover:text-orange">
                      <p>Electronics</p>
                      <RiArrowRightSFill className="absolute top-2 right-2 text-darkGray" />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link className="relative w-full hover:text-orange">
                      <p>Foot-Wear</p>
                      <RiArrowRightSFill className="absolute top-2 right-0 text-darkGray" />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link className="relative w-full hover:text-orange">
                      <p>Other</p>
                      <RiArrowRightSFill className="absolute top-2 right-2 text-darkGray" />
                    </Link>
                  </ListItem>
                </List>
                <Divider />
                <List>
                  <ListItem>
                    <Link className="flex items-center w-full p-2">
                      <BsFillPersonLinesFill className="mr-2" />{" "}
                      <p className="font-lato font-semibold text-lg hover:text-darkGray">
                        Profile
                      </p>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link className="flex items-center w-full p-2">
                      <RiAccountPinCircleFill className="mr-2 text-lg" />
                      <p className="font-lato font-semibold text-lg hover:text-darkGray">
                        My account
                      </p>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <div
                      onClick={onLogOut}
                      className="flex items-center w-full p-2 hover:cursor-pointer"
                    >
                      <AiOutlineLogout className="mr-2" />{" "}
                      <p className="font-lato font-semibold text-lg hover:text-darkGray">
                        Logout
                      </p>
                    </div>
                  </ListItem>
                </List>
              </Drawer>
            </div>
            {/* Menu side drawer ends */}
            <h1 className="flex flex-col text-3xl font-right">
              IMINENT{" "}
              <span className="text-orange text-xl font-poppins -mt-2 tracking-widest font-normal">
                store
              </span>
            </h1>
          </div>
          <Link className="flex items-center font-poppins font-semibold hover:text-orange">
            <RiShoppingCart2Fill className="text-orange text-3xl" />
            <p className=" hover:-mt-2">Cart</p>
          </Link>
          <SearchModal />
        </div>
      </header>
    </>
  );
};

export default MobileNav;
